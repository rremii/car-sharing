import { Logout } from "../../components/Logout/Logout";
import { useGetMeQuery } from "../../api/meApi";
import { Header } from "./.././../components/Header/Header";

export const ProfilePage = () => {
  const { data: me } = useGetMeQuery();

  return (
    <>
      <Header />
      <main>
        <h2>Profile</h2>
        {!me && <p>Loading...</p>}
        {me && (
          <>
            <p>Name: {me.name}</p>
            <p>Email: {me.email}</p>
            <p>About: {me.about}</p>
          </>
        )}
        <Logout />
      </main>
    </>
  );
};
