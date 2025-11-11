<?php
namespace App;

use PDO;
use PDOException;

class DB {
    private static $pdo = null;

    public static function getConnection(): PDO {
        if (self::$pdo) return self::$pdo;

        // Cargar variables de entorno si existe phpdotenv
        if (file_exists(__DIR__ . '/../.env') && class_exists('Dotenv\Dotenv')) {
            $dotenv = \Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
            $dotenv->load();
        }

        // Credenciales y configuración base
        $host = getenv('PGHOST') ?: 'ep-wispy-snow-a4hpcwhy-pooler.us-east-1.aws.neon.tech';
        $port = getenv('PGPORT') ?: '5432';
        $db   = getenv('PGDATABASE') ?: 'neondb';
        $user = getenv('PGUSER') ?: 'neondb_owner';
        $pass = getenv('PGPASSWORD') ?: 'npg_aD8voY7hXMqf';
        $sslmode = getenv('PGSSLMODE') ?: 'require';

        // ID del endpoint (primera parte del dominio)
        $endpoint_id = 'ep-wispy-snow-a4hpcwhy';

        // 🚀 Cadena DSN corregida para compatibilidad con Neon (sin SNI)
        $dsn = "pgsql:dbname=postgresql://{$user}:{$pass}@{$host}:{$port}/{$db}?sslmode=require&options=endpoint%3D{$endpoint_id}";

        try {
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ];

            self::$pdo = new PDO($dsn, $user, $pass, $options);
            return self::$pdo;

        } catch (PDOException $e) {
            // 🔒 En producción, registra en log seguro en vez de mostrar el error
            http_response_code(500);
            echo json_encode([
                'error' => 'DB connection failed',
                'message' => $e->getMessage()
            ]);
            exit;
        }
    }
}
