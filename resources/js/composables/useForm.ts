// resources/js/composables/useForm.ts
import { reactive, ref } from 'vue'

type Errors = Record<string, string>

function firstError(errors: any, field: string): string | null {
    const v = errors?.[field]
    if (!v) return null
    return Array.isArray(v) ? (v[0] ?? null) : String(v)
}

function readFlashOnce() {
    const w = window as any
    const flash = w.__FLASH__ ?? {}

    // consume-once so it doesn't re-apply on future mounts
    try { delete w.__FLASH__ } catch {}

    return {
        errors: flash.errors ?? {},
        old: flash.old ?? {},
    }
}

export function useForm<T extends Record<string, any>>(initial: T) {
    const { errors: flashErrors, old: flashOld } = readFlashOnce()

    // Optional: apply old input on top of initial values
    const data = reactive({ ...initial, ...flashOld }) as T

    const processing = ref(false)
    const errors = reactive<Errors>({})
    const wasSuccessful = ref(false)

    function clearErrors() {
        for (const k of Object.keys(errors)) delete errors[k]
    }

    function setErrorsFromLaravel(payload: any) {
        clearErrors()
        const bag = payload?.errors ?? payload
        for (const key of Object.keys(bag ?? {})) {
            const msg = firstError(bag, key)
            if (msg) errors[key] = msg
        }
    }

    // Hydrate errors from flash (302 redirect case)
    if (flashErrors && Object.keys(flashErrors).length) {
        setErrorsFromLaravel(flashErrors)
    }

    async function post(url: string, opts?: { method?: string }) {
        processing.value = true
        wasSuccessful.value = false
        clearErrors()

        try {
            const res = await fetch(url, {
                method: opts?.method ?? 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json', // 422 JSON for XHR validation errors
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN':
                        (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)
                            ?.content ?? '',
                },
                body: JSON.stringify(data),
            })

            if (res.status === 422) {
                const json = await res.json()
                setErrorsFromLaravel(json)
                return { ok: false, status: 422, data: json }
            }

            if (!res.ok) {
                const text = await res.text().catch(() => '')
                throw new Error(`Request failed (${res.status}): ${text}`)
            }

            const json = await res.json().catch(() => ({}))
            wasSuccessful.value = true
            return { ok: true, status: res.status, data: json }
        } finally {
            processing.value = false
        }
    }

    return { data, errors, processing, wasSuccessful, post, clearErrors, setErrorsFromLaravel }
}
