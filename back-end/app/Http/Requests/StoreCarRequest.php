<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCarRequest extends FormRequest
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
            'brand'   => 'required',
            'model'   => 'required',
            'year'    => 'required | numeric | max:4 | min:4',
            'price'   => 'required | numeric',
            'mileage' => 'required | numeric',
        ];
    }

    public function messages()
    {
        return [
            'brand.required'    => 'Preencha o campo Marca',
            'model.required'    => 'Preencha o campo Modelo',
            'year.required'     => 'Preencha o campo Anos',
            'price.required'    => 'Preencha o campo Preço',
            'mileage.required'  => 'Preencha o campo Quilometragem',
            'year.numeric'      => 'Ano inválido',
            'year.max'          => 'O Ano são 4 digitos',
            'year.min'          => 'O Ano são 4 digitos',
            'price.numeric'     => 'Preço inválido',
            'mileage.numeric'   => 'Quilometragem inválida',
        ];
    }
}
