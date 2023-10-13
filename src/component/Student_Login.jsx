import { React } from 'react';
import logo from '../assets/logo.png';
import boygirl from '../assets/BoyAndGirl.png';
import { useFormik } from 'formik';
import { studentSchema } from '../SchemaValidation';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Student_Login() {
    const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: studentSchema,
        onSubmit: (values) => onSubmit(values, navigate),
    });

    const navigate = useNavigate();

    // Function to send JWT token with Axios requests
    const setAuthHeader = () => {
        // Assuming you have the JWT token stored in a variable called `jwtToken`
        const jwtToken = "your_jwt_token_here";

        axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
    };

    // Submit Form Values
    const onSubmit = async (values) => {
        try {
            // Set the JWT token in Axios headers before making the request
            setAuthHeader();

            const response = await axios.get('/src/Student_Data/MOCK_USERS.json');
            const students = response.data;

            const student = students.find(
                (student) =>
                    student.username === values.username && student.password === values.password && student.role === 'student'
            );

            if (student) {
                console.log('Login successful');
                console.log(student);
                navigate('/Student_Homepage');
            } else {
                alert('Login failed. Invalid username or password.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    console.log(errors);

    return (
        <div className="flex items-center justify-center min-h-screen background ">
            <main className="w-full md:w-[80%] lg:w-[70%] xl:w-[60%] m-4 text-center   grid grid-cols-[35%_65%] ">

                <div className='grid grid-rows-[40%_15%_35%] text-white bg-[#252525] bg-opacity-95  '>
                    <div className="flex items-center justify-center">
                        <img className='object-cover w-fit h-[90%] m-0 ' src={logo} alt="Logo" />
                    </div>
                    <div><h1 className='text-6xl font-bold font-reemkufifont'>EDUPLAY</h1></div>

                    <div className="flex items-center justify-center">
                        <img className='object-cover w-fit h-[90%]' src={boygirl} alt="Logo" />
                    </div>
                </div>
                <section className='bg-[#f7d538] opacity-95 flex flex-row  justify-center'>
                    <div>
                        <h2 className='mt-40 font-extrabold px-14 text-7xl font-expletus'>Student</h2>
                        <h1 className='font-extrabold mb-14 px-14 text-8xl font-expletus'>SIGN IN  </h1>
                        <div>
                            <form onSubmit={handleSubmit} >
                                <input className={`w-[100%] rounded-full flex p-4 px-10 mt-8 text-4xl bg-zinc-950 text-white border-4 border-zinc-950 placeholder-white font-kumbh text-xl
                                 ${touched.username && errors.username ? 'border-red-500 ' : ''}`}
                                    name='username'
                                    type="text"
                                    placeholder="Username"
                                    value={values.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                </input>

                                <input className={`w-[100%] justify-center flex items-center rounded-full  px-10 border-4 border-zinc-950  p-4 mt-8 text-4xl  bg-zinc-950 text-white placeholder-white font-kumbh text-xl 
                                ${touched.password && errors.password ? 'border-red-500 ' : ''} `}
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}>
                                </input>

                                <div className="flex justify-end mt-2 ">
                                    <div className="mb-6">
                                        <label className="block font-bold text-zinc-900">
                                            <input className="leading-tight " type="checkbox"></input>
                                            <span className="ml-1 text-lg">
                                                Remember me
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                <button className="w-[50%] font-sourceSans3 text-center rounded-full tracking-wide p-4 mt-4 text-3xl border-4 bg-zinc-950 shadow-lg hover:bg-amber-500 hover:text-black hover:border-4 border-black transition ease-in-out delay-150 text-white placeholder-white font-extrabold"
                                    type="submit">
                                    SIGN IN
                                </button>
                            </form>


                        </div>
                    </div>
                </section>
            </main >
        </div >
    );
}
export default Student_Login;
