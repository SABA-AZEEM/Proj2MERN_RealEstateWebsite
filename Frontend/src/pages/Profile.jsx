import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from "../firebase";
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutFailure, signOutStart, signOutSuccess} from "../redux/user/userSlice";
import { Link } from 'react-router-dom';


export default function Profile() {

  const fileRef = useRef(null);
  const {currentUser, loading, error} = useSelector(state=>state.user);
  const [file,setFile] = useState(undefined);
  const [filePerc,setFilePerc] = useState(0);
  const [fileUploadError,setFileUploadError] = useState(false);
  const [formData,setFormData] = useState({});
  const [updateSuccess,setUpdateSuccess] = useState(false);
  const [showListingsError,setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();
  
  
  
  //When changes is made in file's state, then handleFileUplad is called
  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  },[file]);

  //handle file upload functionality
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    //for unique file name
    const fileName = new Date().getTime() + file.name;
    const sotrageRef = ref(storage,fileName);
    const uploadTask = uploadBytesResumable(sotrageRef,file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = 
          (snapshot.bytesTransferred / snapshot.totalBytes)*100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=> setFormData({...formData, avatar:downloadURL}));
      }
    );
  };

  //Functionality for handle input value
  const handleChange = (e)=>{
    setFormData({...formData,[e.target.id]:e.target.value});
  };

  //functionality for handle submit form for update user's data
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      dispatch(updateUserStart());
      console.log(currentUser);
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      const data = await res.json();
      if(data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    }catch(error){
      dispatch(updateUserFailure(error.message));
    }
  };

  //Functionallity for handle delete user account
  const handleDeleteUser = async () =>{
    try{
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();
      if( data.success === false){
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data))
    }catch(error){
      dispatch(deleteUserFailure(error.message));
    }
  }

  //Functionality for handle sign out the user
  const handleSignOut = async () => {
    try{
      dispatch(signOutStart());
      const res = await fetch('/api/auth/signout',{
        method: 'GET',
        credentials: 'include',
      });
      const data = await res.json();
      if( data.success=== false ){
        dispatch(signOutFailure(data.message));
        return;
      }
      dispatch(signOutSuccess(data));
    }catch(error){
      dispatch(signOutFailure(error.message));
    }
  }

  //Function for show listings of the user
  const handleShowListings = async ()=> {
    try{
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false){
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    }catch(error){
      setShowListingsError(true);
    }
  }

  //Function for delete user's listing
  const handleListingDelete = async(listingId) =>{
    try{
      const res = await fetch(`api/listing/delete/${listingId}`,{
        method: 'DELETE',
        // credentials: 'include',
      });
      const data = await res.json();
      if (data.success === false){
        console.log(data.message);
        return;
      }
      setUserListings((prev)=>prev.filter((listing)=>listing._id !==listingId));
    }catch(error){
      console.log(error.message);
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <input 
          onChange={(e)=>setFile(e.target.files[0])} 
          type="file" 
          ref={fileRef} 
          hidden 
          accept="image/*"
        />

        <img 
          onClick={()=>fileRef.current.click()} 
          src={formData.avatar || currentUser.avatar} alt="Profile Image" 
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2" />

        <p className="self-center text-sm">
          {fileUploadError ? (
            <span className="text-red-700">
              Error in Image Upload (image must be less than 2 mb)
            </span>
          ): filePerc>0 && filePerc<100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}`}</span>
          ): filePerc ===100 ? (
            <span className="text-green-700">Image Uploaded Sucessfully!</span>
          ):(
            ""
          )}
        </p>

        <input 
          type="text" 
          defaultValue={currentUser.username} 
          placeholder="Username" 
          className="border p-3 rounded-lg" 
          id="username"
          onChange={handleChange}
        />

        <input 
          type="email" 
          defaultValue={currentUser.email} 
          placeholder="Email" 
          className="border p-3 rounded-lg" 
          id="email"
          onChange={handleChange}
        />

        <input 
          type="Password" 
          placeholder="Password" 
          className="border p-3 rounded-lg" 
          id="password"
          onChange={handleChange}
        />
        
        <button 
        className="rounded-lg border p-3 bg-slate-700 text-white uppercase hover:opacity-95 disabled:opacity-80"
        disabled={loading}
        >
          {loading ? 'Loading...' : 'update'}
        </button>
        <Link to={'/create-listing'} className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95">
          create listing
        </Link>

      </form>

      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Delete Account</span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">Sign Out</span>
      </div>

      {/* <p className="text-red-700 mt-5">{error?error:""}</p> */}
      <p className="text-green-700 mt-5">
        {updateSuccess?'User is updated successfully!':""}
      </p>
      <button onClick={handleShowListings} className="text-green-700 w-full">
        Show Listings
      </button>
      {showListingsError ? <p className="text-red-700 mt-5">Error Showing Listings</p> : ''}

      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-7 text-2xl font-semibold">
            Your Listings
          </h1>
          {userListings.map((listing) => (
            <div key={listing._id} className="border rounded-lg p-3 flex justify-between items-center gap-4">

              <Link to={`/listing/${listing._id}`}>
                <img src={listing.imageUrls[0]} alt="listing cover" className="h-16 w-16 object-contain" />
              </Link>
              <Link to={`/listing/${listing._id}`} className="text-slate-700 font-semibold hover:underline truncate flex-1">
                <p>{listing.name}</p>
              </Link>

              <div className="flex flex-col items-center">
                <button onClick={()=>handleListingDelete(listing._id)} className="text-red-700 uppercase">
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className="text-green-700 uppercase">Edit</button>
                </Link>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
