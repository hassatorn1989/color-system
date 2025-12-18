<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Str;
class Pattern extends Model
{
    protected $table = 'pattern';
    protected $keyType = 'string';
    /** @use HasFactory<\Database\Factories\PatternFactory> */
    use HasFactory;
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

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function ($model) {
            if (!$model->id) {
                $model->id = (string) Str::uuid();
            }
        });
    }
}
