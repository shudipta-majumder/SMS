import { getServerSession } from "next-auth/next";
import { authOptions } from "../../src/app/api/auth/[...nextauth]/route";

export function withAuth (WrappedComponent) {
    return async function AuthenticatedComponent(){
        const session = await getServerSession(authOptions);
        return <WrappedComponent session={session} />
    }
}