const request = require('supertest');
const baseUrl = 'https://petstore.swagger.io/v2';

describe('Swagger Petstore API Tests', () => {
  let petId;
  let orderId;

  //scenarios for endpoint POST /pet
  it('should create a new pet', async () => {
    const response = await request(baseUrl)
      .post('/pet')
      .send({
        "id": 1,
        "category": {
          "id": 1,
          "name": "string"
        },
        "name": "doggie",
        "photoUrls": [
          "string"
        ],
        "tags": [
          {
            "id": 1,
            "name": "string"
          }
        ],
        "status": "available"
      })
      .expect(200);
    expect(response.body.name).toBe('doggie');
  });

  it('should throw an 400 error for invalid input', async () => {
    const response = await request(baseUrl)
      .post('/pet')
      .send({
        "id": "invalidId",
        "category": {
          "id": "invalidId",
          "name": "string"
        },
        "name": "doggie",
        "photoUrls": [
          "string"
        ],
        "tags": [
          {
            "id": "invalidId",
            "name": "string"
          }
        ],
        "status": "available"
      })
      .expect(405);
  });

  it('should throw an 415 error for unsuported media type', async () => {
    const response = await request(baseUrl)
      .post('/pet')
      .send()
      .expect(415);
  });

  //scenarios for endpoint GET /pet/{petId}
  it('should get a pet by id', async () => {
    const response = await request(baseUrl)
      .get('/pet/1')
      .expect(200);
  });

  it('should throw an error 404 because pet not found', async () => {
    const response = await request(baseUrl)
      .get('/pet/invalidId')
      .expect(404);
  });

  it('should throw an error 405 because method not alowed', async () => {
    const response = await request(baseUrl)
      .get('/pet')
      .expect(405);
  });

  //scenarios for endpoint GET /pet/{findByStatus}
  it('should get a list of sold pets', async () => {
    const response = await request(baseUrl)
      .get('/pet/findByStatus?status=sold')
      .expect(200);
  });


  it('should get an error 404 because of invalid status', async () => {
    const response = await request(baseUrl)
    .get('/pet/findByStatus?status=invalidStatus')
    .expect(404);
  });

  //scenarios for endpoint PUT /pet
  it('should update created pet', async () => {
    const response = await request(baseUrl)
      .put('/pet')
      .send({
        "id": 1,
        "category": {
          "id": 1,
          "name": "string"
        },
        "photoUrls": [
          "string"
        ],
        "tags": [
          {
            "id": 1,
            "name": "string"
          }
        ],
        "status": "available"
      })
      .expect(200);
  });

  it('should throw an error because id is invalid', async () => {
    const response = await request(baseUrl)
      .put('/pet')
      .send({
        "id": "invalidId",
        "category": {
          "id": "invalidId",
          "name": "string"
        },
        "photoUrls": [
          "string"
        ],
        "tags": [
          {
            "id": "invalidId",
            "name": "string"
          }
        ],
        "status": "available"
      })
      .expect(400);
  });

  it('should throw an error 405 because url is not alowed', async () => {
    const response = await request(baseUrl)
      .put('/pet/1')
      .send({
        "id": 1,
        "category": {
          "id": 1,
          "name": "string"
        },
        "photoUrls": [
          "string"
        ],
        "tags": [
          {
            "id": 1,
            "name": "string"
          }
        ],
        "status": "available"
      })
      .expect(405);
  });

  //scenarios for endpoint DELETE /pet/{petId}
  it('should delete a pet by id', async () => {
    const response = await request(baseUrl)
      .delete('/pet/1')
      .expect(200);
  });

  it('should throw and error 404 because a pet is not found', async () => {
    const response = await request(baseUrl)
      .delete('/pet/invalidID')
      .expect(404);
  });

  it('should throw and error 405 because url is not alowed', async () => {
    const response = await request(baseUrl)
      .delete('/pet')
      .expect(405);
  });
});
