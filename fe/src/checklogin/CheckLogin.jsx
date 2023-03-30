import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function CheckLogin() {
  const { user } = useSelector(state => state)
	return (
		<>
			{user.value.token === "" ? <Navigate to="/survey" /> : <Outlet />}
		</>
	)
}