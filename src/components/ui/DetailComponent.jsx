import { Form } from "react-bootstrap";

export default function DetailComponent({ selecteduser }) {
  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Nama</Form.Label>
          <Form.Control
            type="text"
            placeholder="name"
            name="name"
            value={selecteduser.nama}
            readOnly
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Alamat</Form.Label>
          <Form.Control
            type="text"
            placeholder="alamat"
            name="alamat"
            value={selecteduser.alamat}
            readOnly
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Jenis Kelamin</Form.Label>

          <Form.Control
            type="text"
            id="pria"
            name="jenisKelamin"
            value={selecteduser.jenisKelamin}
            readOnly
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Tanggal Lahir</Form.Label>
          <Form.Control
            type="text"
            name="tanggalLahir"
            value={selecteduser.tanggalLahir}
            readOnly
          />
        </Form.Group>
      </Form>
    </div>
  );
}
