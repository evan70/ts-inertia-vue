export {};
declare global {
  export namespace inertia {
    export interface Props {
      user: {
        id: number;
        name: string;
        email: string;
        created_at: Date;
        updated_at: Date;
      };
      breeze: {
        [key: string]: boolean;
      };
      errorBags: unknown;
      errors: unknown;
    }
  }
}
