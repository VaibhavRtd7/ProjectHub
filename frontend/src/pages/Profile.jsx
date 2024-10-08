/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SiGithub, SiInstagram, SiLinkedin, SiTwitter } from 'react-icons/si'
import { BiWorld } from "react-icons/bi"
import axios from "axios";
import Loading from "../components/Loading";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import UserContext from "../MyContext";
import Review from "../components/Review";
import Project from "../components/Project";

export default function Profile() {
    const { user } = useContext(UserContext);
    const { username } = useParams();
    const navigate = useNavigate();
    const [tabName, setTabName] = useState("Project");
    const [loading, setLoading] = useState(false)
    const [loadingText, setLoadingText] = useState("");
    const [projects, setProjects] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [userInfo, setUser] = useState({})


    async function getProjects() {
        setLoading(true)
        setLoadingText("Getting user info...");
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/${username.slice(1).trim()}`);
            setProjects(response.data.projects);
            setReviews(response.data.reviews);
            setUser(response.data.user);
            setLoading(false)
        } catch (error) {
            // Handle error if the request fails
            console.error('Error fetching projects:', error.message);
            navigate('/notfound')
            setLoading(false)
            return null;
        }
        setLoadingText("");
    }

    useEffect(() => {
        if (username[0] !== "@") {
            navigate('/notfound');
        } else {
            getProjects();
        }
    }, [username])

    return (
        <>

            <Helmet>
                <title>{userInfo?.name || userInfo?.username}</title>
                <meta property="og:title" content={userInfo?.name || userInfo?.username} />
                {userInfo?.profilePicture && <meta property="og:image" content={userInfo?.profilePicture} />}
                <meta property="og:url" content={window.location.href} />
                <meta name="twitter:title" content={userInfo?.name || userInfo?.username} />
                {userInfo?.profilePicture && <meta name="twitter:image" content={userInfo?.profilePicture} />}
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>

            {loading && <Loading text={loadingText} />}
            {!loading && <>
                <div className={`mx-auto lg:w-2/3 sm:w-3/4  w-[95%] flex justify-center  dark:bg-neutral-900/70 bg-neutral-100/70 rounded-md my-5 border dark:border-neutral-800  py-5 px-3  `}>
                    <div className="flex gap-5 flex-wrap justify-center items-center ">
                        <div className="img">
                            <img src={userInfo.profilePicture || '/user.png'} alt={userInfo.username} className="rounded-full select-none sm:w-40 w-24 aspect-square object-cover" />
                        </div>
                        <div className="flex flex-col sm:mx-10 justify-center">
                            <div className="flex sm:gap-5 gap-3 items-center my-2">
                                <h1 className="sm:text-2xl text-xl font-semibold ">@{userInfo.username}</h1>
                                {userInfo.username === user.username && <Link to="/editprofile"><button className="sm:px-3 px-2 sm:py-0.5 dark:bg-neutral-100 dark:text-black text-white rounded bg-neutral-900 ">Edit Profile</button></Link>}
                            </div>
                            <div className="flex sm:gap-5 gap-3 items-center my-2">
                                {
                                    Object.keys(userInfo?.socialMediaLinks || []).map((key) => {
                                        if (userInfo.socialMediaLinks[key] === '') return null;
                                        switch (key) {
                                            case "github":
                                                return <Link target="_blank" key={key} to={userInfo.socialMediaLinks[key]}><SiGithub className="text-xl " /></Link>
                                            case "twitter":
                                                return <Link target="_blank" key={key} to={userInfo.socialMediaLinks[key]}><SiTwitter className="text-xl " /></Link>
                                            case "linkedin":
                                                return <Link target="_blank" key={key} to={userInfo.socialMediaLinks[key]}><SiLinkedin className="text-xl " /></Link>
                                            case "instagram":
                                                return <Link target="_blank" key={key} to={userInfo.socialMediaLinks[key]}><SiInstagram className="text-xl " /></Link>
                                            default:
                                                return <Link target="_blank" key={key} to={userInfo.socialMediaLinks[key]}><BiWorld className="text-xl " /></Link>
                                        }
                                    })
                                }
                            </div>
                            <div className="flex sm:gap-5 gap-3 my-2 items-center">
                                <span>Dev Score: {userInfo.points}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <ul className='mx-auto flex dark:bg-neutral-900 bg-neutral-100 backdrop-blur-sm  lg:w-2/3 sm:w-3/4  w-[95%]  rounded-md  my-5 border  dark:border-neutral-800 py-4 px-3 justify-evenly items-center'>
                    <li className={`cursor-pointer ${tabName === "Project" ? "text-blue-400" : ""}`} onClick={() => {
                        setTabName("Project")
                    }}>Projects</li>
                    <li className={`cursor-pointer ${tabName === "Review" ? "text-blue-400" : ""}`} onClick={() => {
                        setTabName("Review")
                    }}>Reviews</li>
                </ul>

                <div className='mx-auto max-sm:pb-20 lg:w-2/3 sm:w-3/4 w-[95%] flex  rounded-md my-3 items-center'>
                    {tabName === 'Project' &&
                        <motion.div className="w-full flex flex-col items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            {projects.length == 0 ?
                                <p className="text-center text-blue-600 text-2xl"> No projects yet!!</p>
                                :
                                projects.map((project, index) => {
                                    // console.log(project);
                                    return <Project removeProject={() => {
                                        projects.splice(index, 1)
                                        setProjects(projects);
                                    }} setLoading={setLoading} key={index} {...project} />
                                })}

                        </motion.div>}


                    {tabName === 'Review' &&
                        <motion.div className="w-full flex flex-col items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            {reviews.length == 0 ?
                                <p className="text-center text-blue-600 text-2xl"> No review yet!!</p>
                                :
                                reviews.map((review, index) => {
                                    // console.log(project);
                                    return <Review key={index} {...review} onDelete={() => {
                                        reviews.splice(index, 1);
                                        setReviews([...reviews]);
                                    }} />
                                })}
                        </motion.div>
                    }

                </div>
            </>
            }


        </>
    )
}
