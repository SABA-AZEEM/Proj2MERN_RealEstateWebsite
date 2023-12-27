import React from 'react'

const Search = () => {
  return (
    <div className='flex flex-col md:flex-row'>
        {/* div for left side of page */}
        <div className="">
          <form onSubmit={} className=''>
            <div className=''>
              <label className=''>Search Term:</label>
              <input 
                type="text"
                id='searchTerm' 
                placeholder='Search...'
                className=''
                value={}
                onChange={}
              />
            </div>
            <div className=''>
              <label className=''>Type:</label>

              <div className=''>
                <input 
                  type="checkbox"
                  id='all' 
                  className=''
                  onChange={}
                  checked={}
                />
                <span>Rent & Sale</span>
              </div>

              <div className=''>
                <input 
                  type="checkbox"
                  id='all' 
                  className=''
                  onChange={}
                  checked={}
                />
                <span>Rent</span>
              </div>

              <div className=''>
                <input 
                  type="checkbox"
                  id='all' 
                  className=''
                  onChange={}
                  checked={}
                />
                <span>Sale</span>
              </div>

              <div className=''>
                <input 
                  type="checkbox"
                  id='all' 
                  className=''
                  onChange={}
                  checked={}
                />
                <span>Offer</span>
              </div>

            </div>
            <div className=''>
              <label>Amenities</label>

              <div className=''>
                <input 
                  type="checkbox"
                  id='parking' 
                  className=''
                  onChange={}
                  checked={}
                />
                <span>Parking</span>
              </div>

              <div className=''>
                <input 
                  type="checkbox"
                  id='furnished' 
                  className=''
                  onChange={}
                  checked={}
                />
                <span>Furnished</span>
              </div>

            </div>
            <div className=''>
              <label>Sort:</label>
              <select
                id="sort_order"
                defaultValue={}
                onChange={}
                className=''
              >
                <option value="">Price high to low</option>
                <option value="">Price low to high</option>
                <option value="">Latest</option>
                <option value="">Oldest</option>
              </select>
            </div>
            <button className=''>
              Search
            </button>
          </form>

        </div>
        {/* div for right side of page */}
        <div className=''>
          <h1 className=''>
            Listing results:
          </h1>
          <div className=''>

          </div>
        </div>
    </div>
  )
}

export default Search