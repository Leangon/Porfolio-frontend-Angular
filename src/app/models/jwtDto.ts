export interface JwtDto {
    token: string;
    bearer: string;
    email: string;
    authorities: string[];
  }