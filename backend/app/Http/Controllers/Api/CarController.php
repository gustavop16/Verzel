<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCarRequest;
use App\Http\Resources\CarResource;
use App\Models\Car;
use Illuminate\Http\Request;

class CarController extends Controller
{
   
    private $model;

    public function __construct(Car $model) {
        $this->model = $model;
    }
    
    public function all()
    {
        return CarResource::collection($this->model->all());
    }

    public function store(StoreCarRequest $request)
    {
        $input = $request->all();
        return new CarResource($this->model->create($input));
    }
    
    public function show(Car $car)
    {
        return new CarResource($car);
    }
    
    public function update(Request $request, Car $car)
    {
        $input = $request->all();
        return $car->update($input);
    }

    public function destroy(Car $car)
    {
        return $car->delete();
    }
}
