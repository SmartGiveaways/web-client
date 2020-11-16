import { useEffect } from "react";

const Invite = () => {

  useEffect(() => {
    window.location.href = "https://discord.com/oauth2/authorize?client_id=751886759503069287&scope=bot&permissions=355392";
  }, []);

  return <></>;
};

export default Invite;
