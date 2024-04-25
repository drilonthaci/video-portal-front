import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { variables } from '../../Variables';
import Footer from '../../Layout/Footer/Footer';

function CategoryDetails() {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [searchString, setSearchString] = useState('');
  const [filteredVideoPosts, setFilteredVideoPosts] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`${variables.API_URL}/Categories/${categoryId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch category (${response.status} ${response.statusText})`);
        }
        const categoryData = await response.json();
        setCategory(categoryData);
        setFilteredVideoPosts(categoryData.videoPosts); // Initialize with all video posts
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    };

    fetchCategory();
  }, [categoryId]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`${variables.API_URL}/VideoPosts/search?searchString=${searchString}`);
      if (!response.ok) {
        throw new Error(`Failed to search for video posts (${response.status} ${response.statusText})`);
      }
      const searchData = await response.json();
      setFilteredVideoPosts(searchData); 
    } catch (error) {
      console.error('Error searching for video posts:', error);
    }
  };

  const handleInputChange = (event) => {
    setSearchString(event.target.value);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {category && (
        <>
          <div className="bg-cover bg-center h-96 flex items-center" style={{ backgroundImage: `url(${category.imageUrl})` }}>
            <div className="text-white mx-auto w-4/5">
              <div className="w-3/5">
                <h1 className="text-4xl font-semibold text-white">{category.name}</h1>
                <p className="text-lg mt-2 text-white">{category.shortDescription}</p>
              </div>
            </div>
          </div>
          <div className="container mx-auto py-8">
            <div className="flex justify-end mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search video posts..."
                  value={searchString}
                  onChange={handleInputChange}
                  className="border rounded-l-md px-4 py-2 w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-r-md">
                  Search
                </button>
              </div>
            </div>
            <h3 className="text-2xl font-semibold mb-4 tracking-wide">Contents</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-7">
              {filteredVideoPosts.map(video => (
                <Link key={video.id} to={`/video/${video.id}`}>
                  <div className="rounded-lg overflow-hidden h-full">
                    <img src={video.imageUrl} alt={video.title} className="w-full h-40 object-cover" />
                    <div className="p-2">
                      <h2 className="text-l font-semibold mb-2 text-gray-800">{video.title}</h2>
                      <p className="text-gray-600 text-lg">{video.shortDescription}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-gray-800 mt-8">
              <p>{category.description}</p>
            </div>
            
          </div>
        </>
        
      )}
      <Footer />
    </div>
  );
}

export default CategoryDetails;
