import { useState } from "react";
import { useAuthUser, withAuthUser,  } from 'next-firebase-auth';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import Button from "../components/Button";
import Router from "next/router";
import LoadingSpin from "../components/LoadingSpin";
import Link from "next/link";

const Register = () => {
  var user = useAuthUser();
  if (user.id) {
    Router.push("/");
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);

  const register = () => {
    setLoading(true)

    createUserWithEmailAndPassword(getAuth(), email, password)
      .then(() => {})
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => { setLoading(false); });
  }

  const changeEmail = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  }

  const changePassword = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  }

  return (
    <div className="w-full max-w-xs mx-auto mt-20">
      <form className="bg-white shadow-md rounded-lg px-8 py-6 mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={changeEmail}
          placeholder="joao@poli.ufrj.br"
          className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none"
        />
        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="password">
          Senha
        </label>
        <input
          id="password"
          type="password"
          value={password}
          placeholder="********"
          onChange={changePassword}
          className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none"
        />

        { error &&
          <span className="text-red-500 text-sm">
            { error }
          </span>
        }

        <div className="flex justify-center">
          { !loading &&
            <Button onClick={register}>Criar conta</Button>
          }
          { loading && <LoadingSpin/> }
        </div>
        <div className="text-center text-[#523f90] underline">
          <Link href="/login">Fazer login</Link>
        </div>
      </form>
    </div>
  )
}

export default withAuthUser()(Register);
