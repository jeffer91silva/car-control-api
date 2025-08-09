module.exports = {
  "openapi": "3.0.0",
  "info": {
    "title": "Car Control API",
    "version": "1.1.0",
    "description": "API para controle de automóveis, motoristas e utilizações. Persistência em memória. Extras: Swagger, ordenação, health e reset."
  },
  "paths": {
    "/automoveis": {
      "get": {
        "summary": "Listar automóveis",
        "parameters": [
          {
            "name": "cor",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "marca",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "sort",
            "in": "query",
            "schema": {
              "type": "string",
              "enum": [
                "placa",
                "cor",
                "marca"
              ]
            }
          },
          {
            "name": "order",
            "in": "query",
            "schema": {
              "type": "string",
              "enum": [
                "asc",
                "desc"
              ]
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      },
      "post": {
        "summary": "Criar automóvel",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/AutomovelInput"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Created"
          }
        }
      }
    },
    "/automoveis/{id}": {
      "get": {
        "summary": "Obter automóvel",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "404": {
            "description": "Not Found"
          }
        }
      },
      "put": {
        "summary": "Atualizar automóvel",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/AutomovelInput"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK"
          },
          "404": {
            "description": "Not Found"
          }
        }
      },
      "delete": {
        "summary": "Excluir automóvel",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "No Content"
          },
          "404": {
            "description": "Not Found"
          }
        }
      }
    },
    "/motoristas": {
      "get": {
        "summary": "Listar motoristas",
        "parameters": [
          {
            "name": "nome",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "sort",
            "in": "query",
            "schema": {
              "type": "string",
              "enum": [
                "nome"
              ]
            }
          },
          {
            "name": "order",
            "in": "query",
            "schema": {
              "type": "string",
              "enum": [
                "asc",
                "desc"
              ]
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      },
      "post": {
        "summary": "Criar motorista",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/MotoristaInput"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Created"
          }
        }
      }
    },
    "/motoristas/{id}": {
      "get": {
        "summary": "Obter motorista",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "404": {
            "description": "Not Found"
          }
        }
      },
      "put": {
        "summary": "Atualizar motorista",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/MotoristaInput"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK"
          },
          "404": {
            "description": "Not Found"
          }
        }
      },
      "delete": {
        "summary": "Excluir motorista",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "No Content"
          },
          "404": {
            "description": "Not Found"
          }
        }
      }
    },
    "/utilizacoes": {
      "get": {
        "summary": "Listar utilizações",
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      },
      "post": {
        "summary": "Iniciar utilização",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UtilizacaoStart"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Created"
          },
          "404": {
            "description": "Not Found"
          },
          "409": {
            "description": "Conflict"
          }
        }
      }
    },
    "/utilizacoes/{id}/finalizar": {
      "post": {
        "summary": "Finalizar utilização",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "404": {
            "description": "Not Found"
          },
          "409": {
            "description": "Already finished"
          }
        }
      }
    },
    "/admin/reset": {
      "post": {
        "summary": "Resetar dados em memória",
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/health": {
      "get": {
        "summary": "Healthcheck",
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/docs": {
      "get": {
        "summary": "Swagger UI",
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "AutomovelInput": {
        "type": "object",
        "properties": {
          "placa": {
            "type": "string"
          },
          "cor": {
            "type": "string"
          },
          "marca": {
            "type": "string"
          }
        },
        "required": [
          "placa",
          "cor",
          "marca"
        ]
      },
      "MotoristaInput": {
        "type": "object",
        "properties": {
          "nome": {
            "type": "string"
          }
        },
        "required": [
          "nome"
        ]
      },
      "UtilizacaoStart": {
        "type": "object",
        "properties": {
          "idAutomovel": {
            "type": "string"
          },
          "idMotorista": {
            "type": "string"
          },
          "motivo": {
            "type": "string"
          }
        },
        "required": [
          "idAutomovel",
          "idMotorista",
          "motivo"
        ]
      }
    }
  }
}