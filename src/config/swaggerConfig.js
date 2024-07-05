export const swaggerConfig = {
    "swagger": "2.0",
    "info": {
        "title": "Valafar Node API",
        "version": "1.0.0",
        "description": "Documentación de la API con Swagger"
    },
    "tags": [
        {
            "name": "AuthRoutes",
            "description": "Endpoints para autentificación"
        }
    ],
    "paths": {
        "/api/auth/login": {
            "post": {
                "summary": "Inicio de sesión",
                "description": "Genera tokens de acceso y actualización.",
                "tags": [
                    "AuthRoutes"
                ],
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "username": {
                                    "type": "string",
                                    "example": "admin"
                                },
                                "password": {
                                    "type": "string",
                                    "example": "admin"
                                }
                            },
                            "required": ["username", "password"]
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Tokens generados exitosamente",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "accessToken": {
                                    "type": "string",
                                    "description": "Token de acceso JWT",
                                    "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                                },
                                "refreshToken": {
                                    "type": "string",
                                    "description": "Token de actualización JWT",
                                    "example": "dGhpc2lzYXJlZnJlc2h0b2tlbjEyMw=="
                                },
                                "tokenType": {
                                    "type": "string",
                                    "description": "Tipo de token, generalmente 'Bearer'",
                                    "example": "Bearer"
                                },
                                "expiresIn": {
                                    "type": "integer",
                                    "description": "Tiempo de expiración en segundos",
                                    "example": 3600
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Solicitud incorrecta",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "description": "Descripción del error",
                                    "example": "Error con las credenciales."
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/auth/refresh-token": {
            "post": {
                "summary": "Actualización del token de acceso",
                "description": "Genera un nuevo token de acceso utilizando el token de actualización.",
                "tags": [
                    "AuthRoutes"
                ],
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "refreshToken": {
                                    "type": "string",
                                    "example": "dGhpc2lzYXJlZnJlc2h0b2tlbjEyMw=="
                                }
                            },
                            "required": ["refreshToken"]
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Nuevo token de acceso generado exitosamente",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "accessToken": {
                                    "type": "string",
                                    "description": "Nuevo token de acceso JWT",
                                    "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "No autorizado",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "description": "Se envía el request sin token.",
                                    "example": "Refresh token no proporcionado."
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "BearerAuth": []
                    }
                ]
            }
        },
        "/api/auth/logout": {
            "post": {
                "summary": "Cierre de sesión",
                "description": "Finaliza la sesión del usuario actual.",
                "tags": [
                    "AuthRoutes"
                ],
                "responses": {
                    "200": {
                        "description": "Logout exitoso",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "description": "Mensaje indicando el éxito del cierre de sesión",
                                    "example": "Logout exitoso."
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "No autorizado",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "description": "Mensaje de error indicando que no se está autorizado para realizar la operación",
                                    "example": "Acceso denegado. Token revocado."
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "BearerAuth": []
                    }
                ]
            }
        }
    },
    "securityDefinitions": {
        "BearerAuth": {
            "type": "apiKey",
            "name": "Authorization",
            "in": "header",
            "description": "Token de autenticación Bearer. Prefijo 'Bearer' seguido del token."
        }
    }
};