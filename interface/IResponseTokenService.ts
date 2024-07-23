export interface IResponseTokenService {
    status: boolean
    message?: messageTokenService
    data?: { id: string }
}

export type messageTokenService = "Não logado" | "Sessão expirada"