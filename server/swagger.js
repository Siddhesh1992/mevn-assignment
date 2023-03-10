const { version } = require("./package.json");
module.exports = {
  openapi: "3.0.3",
  info: {
    title: "Assignment",
    description: "MEVN Assignment",
    version,
  },
  tags: [
    { name: "Client", description: "This is a Client Api" },
    { name: "Provider", description: "This is a Provider Api" },
  ],

  paths: {
    "/client": {
      get: {
        tags: ["Client"],
        summary: "Get Client",
        description: " Get Client",
        operationId: "getClient",
        parameters: [
          {
            name: "id",
            in: "query",
            description: "Client _id to get one Client",
            required: false,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ClientResponse",
                },
              },
            },
          },
          400: {
            description: "Invalid Request",
          },
        },
      },
      post: {
        tags: ["Client"],
        summary: "create Client",
        description: " create Client",
        operationId: "createPost",
        requestBody: {
          required: true,
          description: "Create Awesome Client ",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Client",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ClientResponse",
                },
              },
            },
          },
          400: {
            description: "Invalid Request",
          },
        },
      },
    },
    "/client/{id}": {
      put: {
        tags: ["Client"],
        summary: "Update Client",
        description: " Update Client",
        operationId: "updateClient",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Client _id to update",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          description: "Update Awesome Client ",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Client",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ClientResponse",
                },
              },
            },
          },
          400: {
            description: "Invalid Request",
          },
        },
      },
      delete: {
        tags: ["Client"],
        operationId: "deletePost",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Client _id to delete",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ClientResponse",
                },
              },
            },
          },
          400: {
            description: "Invalid Request",
          },
        },
      },
    },
    "/provider": {
      get: {
        tags: ["Provider"],
        summary: "Get Provider",
        description: " Get Provider",
        operationId: "getProvider",
        parameters: [
          {
            name: "id",
            in: "query",
            description: "Provider _id to get one Provider",
            required: false,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ProviderResponse",
                },
              },
            },
          },
          400: {
            description: "Invalid Request",
          },
        },
      },
      post: {
        tags: ["Provider"],
        summary: "create Provider",
        description: " create Provider",
        requestBody: {
          description: "Create Awesome Provider ",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Provider",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ProviderResponse",
                },
              },
            },
          },
          400: {
            description: "Invalid Request",
          },
        },
      },
    },
    "/provider/{id}": {
      put: {
        tags: ["Provider"],
        summary: "Update Provider",
        description: " Update Provider",
        operationId: "updateProvider",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Provider _id to update",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          description: "Update Awesome Provider ",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Provider",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ProviderResponse",
                },
              },
            },
          },
          400: {
            description: "Invalid Request",
          },
        },
      },
      delete: {
        tags: ["Provider"],
        operationId: "deletePost",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Provider _id to delete",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ProviderResponse",
                },
              },
            },
          },
          400: {
            description: "Invalid Request",
          },
        },
      },
    },
  },
  components: {
    schemas: {
      ClientResponse: {
        type: "object",
        properties: {
          message: {
            type: "string",
            description: "Add any name",
            example: "test",
          },
          error: {
            type: "string",
            description: "Add unique email",
            example: "test@test.com",
          },
          data: {
            type: "array",
            items: {
              $ref: "#/components/schemas/Client",
            },
          },
        },
      },
      ProviderResponse: {
        type: "object",
        properties: {
          message: {
            type: "string",
            description: "Add any name",
            example: "test",
          },
          error: {
            type: "string",
            description: "Add unique email",
            example: "test@test.com",
          },
          data: {
            type: "array",
            items: {
              $ref: "#/components/schemas/Provider",
            },
          },
        },
      },
      Client: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Add any name",
            example: "test",
          },
          email: {
            type: "string",
            description: "Add unique email",
            example: "test@test.com",
          },
          phone: {
            type: "string",
            description: "Add phone",
            example: "999-999-9999",
          },
          provider: {
            type: "array",
            items: {
              type: "string",
              description: "Provider _id",
              example: "5e245556",
            },
          },
        },
      },
      Provider: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Add any name",
            example: "test",
          },
        },
      },
    },
  },
};
