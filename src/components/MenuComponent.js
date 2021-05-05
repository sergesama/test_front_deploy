import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem,ListGroupItem ,ListGroup,InputGroup,Button,Input,Label,Form} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

    function RenderMenuItem({ book, onClick }) {
        return(
            <ListGroupItem>
                <Link to={`/menu/${book._id}`} onClick={onClick } >
                        <CardTitle>{book.title}</CardTitle>
                </Link>
            </ListGroupItem>
        );
    }
    class Menu extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                search: '',
                books: [ ...this.props.books.books]
            };
           
          }

        
          handleChange = (event) => {
            this.setState({search: event.target.value});
          }
        
          handleSearch = (event) => {
            event.preventDefault();
            
            this.searchFilter(this.state.search);
            
          }
          resetBooks= () => {
            this.props.books.books=this.state.books;
          }
        searchFilter = (searchText) => {
            this.resetBooks();
            this.props.books.books=this.state.books;
            let searchArr=[...this.props.books.books];
            console.log(searchText)
          var searchORProps=searchText.toLowerCase().split(" или ");
          let OrBooksArr = [];
          searchORProps.forEach(( item, i, arr) =>{
            var searchANDProps=item.toLowerCase().split(" и ");
            let ANDBooksArr=[...searchArr];
            console.log(searchANDProps)
            console.log("Original ANDBooksArr")
            console.log(ANDBooksArr)
            console.log("Original OrBooksArr")
            console.log(OrBooksArr)
            searchANDProps.forEach(( item, i, arr) => ANDBooksArr=ANDBooksArr.filter((book) => 
                ((book.title.toLowerCase().indexOf(item)!=-1 || book.description.toLowerCase().indexOf(item)!=-1) && (item.toLowerCase().indexOf("не ")==-1)) || ((book.title.toLowerCase().indexOf(item.replace("не ",''))==-1 || book.description.toLowerCase().indexOf(item.replace("не ",''))==-1) && (item.toLowerCase().indexOf("не ")!=-1))
             ))
            console.log("Changed ANDBooksArr")
            console.log(ANDBooksArr)
            OrBooksArr=[...new Set(OrBooksArr.concat(ANDBooksArr))];
            console.log("Changed OrBooksArr")
            console.log(OrBooksArr)
          })
          this.props.books.books=OrBooksArr;
          this.props.books.books.sort(function(a, b){
            if(a.title < b.title) return -1;
            if(a.title > b.title) return 1;
            return 0;
        })
          this.forceUpdate()
          console.log(this.props.books.books);
        }
        

        render() {
        if (this.props.books.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (this.props.books.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{this.props.books.errMess}</h4>
                    </div>
                </div>
            );
        }
        else
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-12 ">
                            <h3>Books</h3>
                            <hr />
                            <Form onSubmit={this.handleSearch}>
                            <InputGroup className="mb-3">
                            <Input className="col-4" type="text" placeholder="Search" aria-label="Search" value={this.state.search}  onChange={e=>this.handleChange(e)}/>
                            <Button type="submit" value="Submit" className="btn btn-primary" ><span className="fa fa-search"></span></Button>
                            </InputGroup>
                            </Form>
                                    
                            
                        </div>
                    </div>
                    <div className="row">
                    <ListGroup>
                    {this.props.books.books.map((book) => {
            
                        return (
                                <RenderMenuItem book={book} onClick={this.resetBooks} />
                        );
                    })}
                        </ListGroup>
                    </div>
                </div>
            );
        }
    }

export default Menu;