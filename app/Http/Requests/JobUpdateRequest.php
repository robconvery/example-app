<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class JobUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'sale' => 'required|numeric|min:0'
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'The job name is required.',
            'name.string' => 'The job name must be a string.',
            'name.max' => 'The job name may not be greater than 255 characters.',
            'sale.required' => 'The sale amount is required.',
            'sale.numeric' => 'The sale amount must be a number.',
            'sale.min' => 'The sale amount must be at least 0.',
        ];
    }
}
