import React from 'react'
import AdminNavbar from './AdminNavbar'
import './AdminDashboard.css'

import { useNavigate} from 'react-router-dom'


function AdminDashboard(){
    const navigate = useNavigate();
    function userClick(){
      navigate("/register_table")

    }
    function addbookClick(){
        navigate("/course_books")
      }
      function deletebookClick(){
        navigate("/delete_books")
      }
      function viewClick(){
        navigate("/ratingspage")
      }
      function borrowClick(){
        navigate("/borrowpage")
      }
    return(
        
    <div>
        <AdminNavbar></AdminNavbar>
        <div className="worlds">
            Welcome to Admin Page
        <div className="underlines"></div>
    </div>
    <div className='over'>
        <div className='card-contai'>
            <div className='image-contai'>
                <img src="https://ruuvi.com/i/u/Books-in-booshelf-1024x683.jpg" alt="" />
            </div>
            <div className='card-content'>
            <div>
                <button onClick={addbookClick}  className='submit'>
                    Add Book
                </button>
                
            </div>
            <div className='card-body'>
                <p>To Add New book to Library</p>
            </div>
            </div>
        </div>
        <div className='card-contai'>
            <div className='image-contai'>
                <img src="https://en.pimg.jp/078/218/000/1/78218000.jpg" alt="" />
            </div>
            <div className='card-content'>
            <div>
                <button onClick={deletebookClick} className='submit'>
                    Edit/Delete Book
                </button>
                
            </div>
            <div className='card-body'>
                <p>To Delete Existing book to Library</p>
            </div>
            </div>
        </div>
        <div className='card-contai'>
            <div className='image-contai'>
                <img src="https://www.groovypost.com/wp-content/uploads/2018/10/woman_writing_computer_featured-1000x450.jpg" alt="" />
            </div>
            <div className='card-content'>
            <div>
                <button onClick={userClick} className='submit'>
                    View Users
                </button>
                
            </div>
            <div className='card-body'>
                <p>To view all user details of Library</p>
            </div>
            </div>
        </div>
        <div className='card-contai'>
            <div className='image-contai'>
                <img src="https://img.freepik.com/premium-vector/different-people-give-feedback-ratings-reviews-characters-hold-stars-their-heads-evaluation-customer-reviews-five-star-rating-customers-evaluating-product-service-illustration_167581-809.jpg" alt="" />
            </div>
            <div className='card-content'>
            <div>
                <button className='submit' onClick={viewClick}>
                    View Ratings
                </button>
                
            </div>
            <div className='card-body'>
                <p>To view ratings of Library</p>
            </div>
            </div>
        </div>
        <div className='card-contai'>
            <div className='image-contai'>
                <img src="https://img.freepik.com/premium-vector/different-people-give-feedback-ratings-reviews-characters-hold-stars-their-heads-evaluation-customer-reviews-five-star-rating-customers-evaluating-product-service-illustration_167581-809.jpg" alt="" />
            </div>
            <div className='card-content'>
            <div>
                <button className='submit' onClick={borrowClick}>
                    Borrowed Books
                </button>
                
            </div>
            <div className='card-body'>
                <p>To take actions for borrowed books</p>
            </div>
            </div>
        </div>
        
    </div>
    </div>
    )}

export default AdminDashboard