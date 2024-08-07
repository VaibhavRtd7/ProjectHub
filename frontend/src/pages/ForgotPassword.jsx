import axios from "axios";
import { useState } from "react"
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

export default function ForgotPassword() {
	const [email, setEmail] = useState('')
	const [isMailSent, setMailSent] = useState(false)

	const sendEmail = async (e) => {
		e.preventDefault();
		if (email === '' || !email.includes('@') || !email.includes('.')) {
			toast.error("Invalid Email")
			return
		}
		try {
			await toast.promise(axios.get(`${import.meta.env.VITE_API_URL}/api/forgot-password/${email}`), {
				pending: 'Sending Email',
				success: 'Email Sent Successfully',
			});
			setMailSent(true)
		} catch (error) {
			console.log(error);
			toast.error(error.response.data.message)
		}
	}

	return (
		<>
			<Helmet>
				<title>Showcase | Forgot Password</title>
			</Helmet>

			{isMailSent &&
				<div className='max-w-2xl max-md:mx-10 my-10 px-3 py-5 dark:bg-neutral-900 bg-neutral-100 mx-auto rounded-md border dark:border-neutral-800 border-neutral-200 shadow-lg'>
					<p className="text-center text-xl my-2">Check your email for the reset link</p>
				</div>
			}

			<div className='max-w-2xl max-md:mx-10 my-10 px-3 py-5 dark:bg-neutral-900 bg-neutral-100 mx-auto rounded-md border dark:border-neutral-800 border-neutral-200 shadow-lg'>
				<h1 className="text-center text-4xl my-2">Forgot Password</h1>
				<form className="flex flex-col  justify-center" onSubmit={(e) => sendEmail(e)}>

					<input required type="email" onChange={(e) => { setEmail(e.target.value) }}
						placeholder="Email" name="email" className="w-full px-3 py-1 my-3 rounded-md dark:bg-neutral-800 outline-none transition-all border dark:border-neutral-700 border-neutral-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-200" />
					<button type="submit" className="w-full px-3 py-1 my-3 text-neutral-200 rounded-md bg-blue-600 hover:bg-blue-500 transition-all duration-300" >Submit</button>
				</form>
			</div>

		</>
	)
}
