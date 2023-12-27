import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem.jsx';

const Search = () => {

  const navigate = useNavigate();
  //State handle variables
  const [sidebarData, setSidebarData ] = useState({
    searchTerm: '',
    type: 'all',
    offer: false,
    parking:false,
    furnished: false,
    sort:'createdAt',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  console.log(listings);
  
  //When url in screen change then form data also change functionality
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const offerFromUrl = urlParams.get('offer');
    const furnishedFromUrl = urlParams.get('furnished');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if( searchTermFromUrl || typeFromUrl || parkingFromUrl || furnishedFromUrl || offerFromUrl || sortFromUrl || orderFromUrl){
      setSidebarData({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true'? true:false,
        furnished: furnishedFromUrl==='true'?true:false,
        offer: offerFromUrl === 'true'? true:false,
        sort: sortFromUrl || 'createdAt',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if(data.length > 8){
        setShowMore(true);
      }else{
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  },[location.search]);

  //Function for handle change input data
  const handleChange = (e) => {

    if( e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale'){
      setSidebarData({...sidebarData, type:e.target.id});
    }

    if(e.target.id === 'searchTerm'){
      setSidebarData({...sidebarData, searchTerm: e.target.value });
    }

    if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
      setSidebarData({...sidebarData,[e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false ,});
    }

    if(e.target.id === 'sort_order'){
      const sort = e.target.value.split('_')[0] || 'createdAt';
      const order = e.target.value.split('_')[1] || 'desc';
      setSidebarData({...sidebarData,sort,order});
    }

  };

  //Function for handle submission of form
  const handleSubmit = (e)=>{
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('type', sidebarData.type);
    urlParams.set('parking', sidebarData.parking);
    urlParams.set('furnished', sidebarData.furnished);
    urlParams.set('offer', sidebarData.offer);
    urlParams.set('sort', sidebarData.sort);
    urlParams.set('order', sidebarData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }

  //Function for handle show more button functionality
  const onShowMoreClick = async () => {

  };

  return (
    <div className='flex flex-col md:flex-row'>
        {/* div for left side of page */}
        <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
          <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
            <div className='flex items-center gap-2'>
              <label className='whitespace-nowrap font-semibold'>Search Term:</label>
              <input 
                type="text"
                id='searchTerm' 
                placeholder='Search...'
                className='border rounded-lg p-3 w-full'
                value={sidebarData.searchTerm}
                onChange={handleChange}
              />
            </div>
            <div className='flex gap-2 flex-wrap items-center'>
              <label className='font-semibold'>Type:</label>

              <div className='flex gap-2'>
                <input 
                  type="checkbox"
                  id='all' 
                  className='w-5'
                  onChange={handleChange}
                  checked={sidebarData.type === 'all'}
                />
                <span>Rent & Sale</span>
              </div>

              <div className='flex gap-2'>
                <input 
                  type="checkbox"
                  id='rent' 
                  className='w-5'
                  onChange={handleChange}
                  checked={sidebarData.type === 'rent'}
                />
                <span>Rent</span>
              </div>

              <div className='flex gap-2'>
                <input 
                  type="checkbox"
                  id='sale' 
                  className='w-5'
                  onChange={handleChange}
                  checked={sidebarData.type === 'sale'}
                />
                <span>Sale</span>
              </div>

              <div className='flex gap-2'>
                <input 
                  type="checkbox"
                  id='offer' 
                  className='w-5'
                  onChange={handleChange}
                  checked={sidebarData.offer}
                />
                <span>Offer</span>
              </div>

            </div>
            <div className='flex gap-2 flex-wrap items-center'>
              <label className='font-semibold'>Amenities</label>

              <div className='flex gap-2'>
                <input 
                  type="checkbox"
                  id='parking' 
                  className='w-5'
                  onChange={handleChange}
                  checked={sidebarData.parking}
                />
                <span>Parking</span>
              </div>

              <div className='flex gap-2'>
                <input 
                  type="checkbox"
                  id='furnished' 
                  className='w-5'
                  onChange={handleChange}
                  checked={sidebarData.furnished}
                />
                <span>Furnished</span>
              </div>

            </div>
            <div className='flex items-center gap-2'>
              <label className='font-semibold'>Sort:</label>
              <select
                id="sort_order"
                defaultValue={'created_at_desc'}
                onChange={handleChange}
                className='border rounded-lg p-3'
              >
                <option value="regularPrice_desc">Price high to low</option>
                <option value="regularPrice_asc">Price low to high</option>
                <option value="createdAt_desc">Latest</option>
                <option value="createdAt_asc">Oldest</option>
              </select>
            </div>
            <button className='bg-slate-700 p-3 rounded-lg uppercase hover:opacity-95 text-white'>
              Search
            </button>
          </form>

        </div>
        {/* div for right side of page */}
        <div className='flex-1'>
          <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>
            Listing results:
          </h1>
          <div className='p-7 flex flex-wrap gap-4'>

            {!loading && listings.length === 0 && (
              <p className='text-xl text-slate-700'>No listing found!</p>
            )}

            {loading && (
              <p className='text-xl text-slate-700 text-center w-full'>Loading...</p>
            )}

            {!loading && listings && 
              listings.map((listing)=>(
                <ListingItem key={listing._id} listing={listing} />
            ))}

            {showMore && (
              <button 
                onClick={onShowMoreClick}
                className='text-green-700 hover:underline p-7 text-center w-full'
              >
                Show More
              </button>
            )}

          </div>
        </div>
    </div>
  );
}

export default Search