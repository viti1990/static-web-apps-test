interface User {
  id: number;
  name: string;
  email: string;
age: number,
single?: boolean
}

interface Admin extends User {
  adminLevel: number;
}

type Props =
  | { user: User; showAdminInfo: false }
  | { user: Admin; showAdminInfo: true };

export const TestGeneral = ({ user, showAdminInfo }: Props) => {
  return (
    <div>
      <p>Nombre: {user.name}</p>
      <p>Email: {user.email}</p>
      {showAdminInfo && "adminLevel" in user && (
        <p>Admin Level: {user.adminLevel}</p>
      )}
    </div>
  );
};