<?php
namespace App;

require_once __DIR__ . '/db.php';

use App\DB;


class ContactsController {
private $db;


public function __construct() {
$this->db = DB::getConnection();
}


public function all() {
$stmt = $this->db->query('SELECT id, name, email, phone, created_at, updated_at FROM contacts ORDER BY id DESC');
echo json_encode($stmt->fetchAll());
}


public function get($id) {
$stmt = $this->db->prepare('SELECT id, name, email, phone, created_at, updated_at FROM contacts WHERE id = :id');
$stmt->execute(['id' => $id]);
$row = $stmt->fetch();
if (!$row) { http_response_code(404); echo json_encode(['error' => 'Not found']); return; }
echo json_encode($row);
}


public function create() {
$input = json_decode(file_get_contents('php://input'), true);
if (!isset($input['name']) || !isset($input['email'])) {
http_response_code(400);
echo json_encode(['error' => 'name and email required']);
return;
}


$stmt = $this->db->prepare('INSERT INTO contacts (name, email, phone) VALUES (:name, :email, :phone) RETURNING id, name, email, phone, created_at, updated_at');
$stmt->execute([
'name' => $input['name'],
'email' => $input['email'],
'phone' => $input['phone'] ?? null
]);
$created = $stmt->fetch();
http_response_code(201);
echo json_encode($created);
}


public function update($id) {
$input = json_decode(file_get_contents('php://input'), true);
$fields = [];
$params = ['id' => $id];
if (isset($input['name'])) { $fields[] = 'name = :name'; $params['name'] = $input['name']; }
if (isset($input['email'])) { $fields[] = 'email = :email'; $params['email'] = $input['email']; }
if (array_key_exists('phone', $input)) { $fields[] = 'phone = :phone'; $params['phone'] = $input['phone']; }


if (empty($fields)) {
http_response_code(400);
echo json_encode(['error' => 'no fields to update']);
return;
}


$fields[] = 'updated_at = now()';
$sql = 'UPDATE contacts SET ' . implode(', ', $fields) . ' WHERE id = :id RETURNING id, name, email, phone, created_at, updated_at';
$stmt = $this->db->prepare($sql);
$stmt->execute($params);
$row = $stmt->fetch();
if (!$row) { http_response_code(404); echo json_encode(['error' => 'Not found']); return; }
echo json_encode($row);
}


public function delete($id) {
$stmt = $this->db->prepare('DELETE FROM contacts WHERE id = :id RETURNING id');
$stmt->execute(['id' => $id]);
$row = $stmt->fetch();
if (!$row) { http_response_code(404); echo json_encode(['error' => 'Not found']); return; }
echo json_encode(['deleted' => (int)$row['id']]);
}
}