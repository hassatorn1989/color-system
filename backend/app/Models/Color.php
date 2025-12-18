<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Str;
class Color extends Model
{
    protected $table = 'color';
    /** @use HasFactory<\Database\Factories\ColorFactory> */
    use HasFactory;
    protected $fillable = [
        'id',
        'group_color_id',
        'priority',
        'color',
        'is_active',
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
