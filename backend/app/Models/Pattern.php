<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class Pattern extends Model
{
    use HasFactory, HasUuids;
    protected $table = 'pattern';
    protected $keyType = 'string';
    protected $fillable = [
        'id',
        'name',
        'file_name',
        'file_path',
        'created_by',
        'updated_by',
        'created_at',
        'updated_at',
        'deleted_at',
    ];
}
