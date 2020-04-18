import React, {Component} from 'react';
import {updateProduct} from '../../../store/actions/vendor/storeAction'
import { connect } from 'react-redux';
// import './style/edit.css'

let prodInfo=[];
let log = console.log
class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: '',
            price: '',
            stock: '',
            image:'',
            size:'',
            description: '',
            discountedPrice: '',
            initialDate: '',
            lastDate:'',
            file:'',
            keywords:[],
            keyword:'',
            prodInfo: [],
            prodId:'',
            checked: false,
            schedule: false,
            imgToggle: false,
            imagePicker: false,
            selectedCategory: '',
            selectedCategoryS: '',
            selectedCategoryT: '',
            categoryF:['Mens','Womens','Childrens','Others'],
            categoryS:  [{'Mens': [ 'Pents','Shirts','UnderWare','Socks','Bunyan','Unstiched','Groom Suits'],
                            // {'Pents': ['Jeans','Dress'] },
                            // {'Shirts': ['cotton','washenware']},
                            // 'Underware','Socks','Bunyan','Unstiched','Groom Suits'
                         },
                         {'Womens': ['Kurty','Suits','Night Suits','Unstiched','Bridal Suits','Undergarments']},
                         {'Childrens': ['baby','baba','others'] },
                         {'Others': ['Towels','abc','def others']}
                         ],  

            Mens:       [
                        {'Pents': [ 'Jeans','Dress']},
                        {'Shirts': ['Cotton','Washenware']},
                        {'Socks': ['Pollyster','Others',''] },
                        {'Groom Suits': ['Cotton','Landa']}
                        ],
            Womens:       [
                            {'Kurty': [ 'Loan','Cotton','Leelan','printed','embroidry']},
                            {'Suits': ['Loan','Cotton','Leelan','printed','embroidry']},
                            {'Unstiched': ['Loan','Cotton','others'] },
                            {'Bridal Suits': ['Cotton','Landa']}
                        ],
            product:undefined

         }
    }

    imagePicker(){
        this.refs.fileUploader.click();
        this.setState({
            imagePicker: true
        })
    }

    onChange=e=> this.setState({[e.target.name]:e.target.value})

    imageOnChange=(e)=>{
        let {image} = this.state;

        // this.setState({image: e.target.value});
        e.preventDefault();
console.log(e.target.files)
        let reader = new FileReader();
        let file = e.target.files[0];
        // images.push(reader.result)
        reader.onloadend = () => {
            // images.push(reader.result)
            // log(image)
          this.setState({
            file: file,
            image: reader.result
          });
        }
    
        reader.readAsDataURL(file)
    }
    checked(){
        this.setState({
            checked: !this.state.checked
        })
    }
    schedule(){
        this.setState({
            schedule: !this.state.schedule,            
        })
        if(this.state.checked===true && this.state.schedule===false){
            this.setState({
                checked: false,            
            })
        }

    if(this.state.schedule===true){
        this.setState({
            checked: true
        })
    }
    }
 
    delProdInfo(index){
        let arr = this.state.prodInfo;
        arr.splice(index,1);

        this.setState({
            prodInfo:arr
        })
    }
    prodInfo(e){
        e.preventDefault();
        const {stock,color,image,size} = this.state
        prodInfo=this.state.prodInfo;
        if(prodInfo.length==0){
            prodInfo.push(    
                {
                    color,
                    image,
                    sizeViseStock: [{size,stock}] 
                }
            )
        }
        else if(prodInfo.length!==0){
         let filtered = prodInfo.filter(e => {
             return e.color === color
         })

         if(filtered.length!==0){
            
        let index = prodInfo.findIndex(i => {return i.color === color })
        
        let filteredStock = prodInfo[index].sizeViseStock.filter(e => {
             return ( e.stock === stock )
        })
        let filteredSize = prodInfo[index].sizeViseStock.filter(e => {
            return ( e.size === size )
       })
        console.log(filteredStock)
        if(filteredSize.length!==0){
            const sizeIndex=prodInfo[index].sizeViseStock.findIndex(e=>{return e.size==size})
            prodInfo[index].sizeViseStock[sizeIndex].stock=stock
        }
        else if(filteredSize.length==0){
            prodInfo[index].sizeViseStock.push({size, stock});
        }

        //    prodInfo.forEach(i => {
        //     if(i.color === color){
        //         let fil
        //     }
        //    })
         }
         else{
            prodInfo.push(    
                {
                    color,
                    image, 
                    sizeViseStock: [{size,stock}] 
                }
            )
        }
         
        }
            console.log(prodInfo)
        this.setState({
            prodInfo: prodInfo,
            imagePicker:false
        })


    }

    onSubmit=(e) => {
        e.preventDefault();

       const { name, keywords,description,price,prodInfo,initialdate,lastdate, prodId,discountedPrice,selectedCategory,selectedCategoryS,selectedCategoryT } = this.state;
        let updateProduct = {
        name, description,price,initialdate,lastdate, 
        discountedPrice,selectedCategory,selectedCategoryS,
        selectedCategoryT,prodInfo,storeId:this.props.storeId,
        storeName:this.props.storeInfo.storeInfo[0].name,keywords,prodId
         
        }
        this.props.updateProduct(updateProduct);
        console.log(updateProduct)
    }

    componentDidMount() {
        let editProduct=undefined;
        if(this.props.editProduct){
            let pr = this.props.editProduct;
            // const {name,price,description,discountedPrice,prodInfo, initialDate,lastDate,selectedCategory,selectedCategoryS,selectedCategoryT} = this.state
            this.setState({
                name: pr.name,
                price: pr.price,
                discountedPrice: pr.discountedPrice,
                initialDate: pr.initialDate,
                lastDate: pr.lastDate,
                prodInfo:pr.inventory,
                selectedCategory:pr.selectedCategory,
                selectedCategoryS:pr.selectedCategoryS,
                selectedCategoryT:pr.selectedCategoryT,
                keywords:pr.keywords,
                description:pr.description,
                prodId:pr._id
            })
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.updateProduct){
            
        }
        console.log(this.props.history)
    }

    render() { 
        
        const {selectedCategory,selectedCategoryS,categoryS,categoryF,Mens,Womens,selectedCategoryT,initialDate,lastDate}= this.state
        console.log(this.state)
        return ( 
            <div>
                <div className='container' >
                    <div className='row' > 
                    <div className='col' >
                        <div className='editProdImage'  onClick={this.imagePicker.bind(this)} >
                           <div className='imgCenter' >
                                <i class="fa fa-cloud" style={{color: '#c7c3c3', fontSize: '60px'}} ></i>
                                <p>Upload Product Cover Image</p>
                           </div>  
                           {/* {this.state.imagePicker!==true? void 0: (<input type='file' />)}                          */}
                        </div>
                    </div>

                    <div className='col editRight ' >
                        <div>
                            <form>
                                <input className='editName' type='text' value={this.state.name} name='name' onChange={this.onChange}  placeholder='product Name'  />
                                
                                <input className='price' type='number' value={this.state.price} name='price' onChange={this.onChange} placeholder='Product price'  />
                               <input   onClick={this.checked.bind(this)} type='checkbox' style={{marginLeft: '30px',width: '20px', height: '20px', }} /> <span style={{fontSize: '16px',marginBottom: '20px'}} >Discounted Price</span>
                               {this.state.checked!==true? void 0 :        
                                (
                                    <div style={{marginTop: '20px'}}>

                                        <input className='disprice'  type='number' value={this.state.discountedPrice} name='discountedPrice' onChange={this.onChange} placeholder='special price' /> 
                                        <span onClick={this.schedule.bind(this)} style={{fontSize: '16px',paddingLeft: '80px',textAlign: 'right',color: 'red',cursor: 'pointer'}} >Schedule</span>
                                    </div>

                                )                       
                               }
                                 {this.state.schedule!==true? void 0 :        
                                (
                                   <div style={{marginTop: '20px'}} >
                                       <span style={{border: '1px solid #e4e3e3', backgroundColor: '#e4e3e3',fontWeight: '500'}} > From </span><input type='date' onChange={this.onChange} value={initialDate} name='initialDate' />
                                       <span style={{border: '1px solid #e4e3e3', backgroundColor: '#e4e3e3',fontWeight: '500',marginLeft: '10px'}} > To </span><input type='date'  onChange={this.onChange} value={lastDate} name='lastDate'/>
                                      
                                   </div>
                                )                       
                               }
                                
                                <textarea id="w3mission" rows="4" cols="50" style={{marginTop: '20px'}} value={this.state.description} name='description' onChange={this.onChange} placeholder='Description'>
                                    
                                </textarea>

                                <div class="input-group ">
                                    <select className='col-12' style={{marginTop: '10px'}}  value={selectedCategory} name='selectedCategory' onChange={this.onChange} >
                                        <option selected>Category...</option>
                                        {categoryF.map((item,index) => {
                                            return (
                                                <option key={index} value={item} > {item} </option>
                                            )
                                        })}
                                    </select>
                                    {  selectedCategory!==''?
                                        selectedCategory==='Mens'? 
                                        (<select className='col-12' style={{marginTop: '10px'}} value={selectedCategoryS} onChange={this.onChange} name='selectedCategoryS' >                                    
                                        {categoryS[0].Mens.map((item,index) =>{
                                            // item.Pents.map((i,e) =>{ 
                                                return (
                                                    <option key='index' value={item} > {item} </option>
                                                )
                                            // }) 
                                         })}                                         
                                         </select>
                                         )
                                         : selectedCategory==='Womens'? 
                                          (<select className='col-12' style={{marginTop: '10px'}} value={selectedCategoryS} onChange={this.onChange} name='selectedCategoryS'>                                    
                                            {categoryS[1].Womens.map((item,index) =>{
                                                return (
                                                    <option key='index' value={item} > {item} </option>
                                                )
                                             })}                                         
                                             </select>
                                             ) : selectedCategory==='Childrens'?
                                             (<select className='col-12' style={{marginTop: '10px'}} value={selectedCategoryS} onChange={this.onChange} name='selectedCategoryS'>                                    
                                               {categoryS[2].Childrens.map((item,index) =>{
                                                   return (
                                                       <option key='index' value={item} > {item} </option>
                                                   )
                                                })}                                         
                                                </select>
                                                ) :  selectedCategory==='Others'?
                                                (<select className='col-12' style={{marginTop: '10px'}} value={selectedCategoryS} onChange={this.onChange} name='selectedCategoryS'>                                    
                                                  {categoryS[3].Others.map((item,index) =>{
                                                      return (
                                                          <option key='index' value={item} > {item} </option>
                                                      )
                                                   })}                                         
                                                   </select>
                                                   )
                                                //    Third category starting from here which is called "selectedCategoryS"
                                                   :  
                                                        void 0
                                     : void 0}
                                     {
                                          selectedCategory==='Mens' ?
                                        
                                         selectedCategoryS==='Pents' ?
                                          (<select className='col-12' style={{marginTop: '10px'}} value={selectedCategoryT} name='selectedCategoryT' onChange={this.onChange} >                                            
                                          { Mens[0].Pents.map((item,index) =>{
                                              return (
                                                  <option key='index' value={item} > {item} </option>
                                              )
                                              })
                                              }                                         
                                              </select>
                                              )
                                              :  selectedCategoryS==='Shirts'?
                                              (<select className='col-12' style={{marginTop: '10px'}} value={selectedCategoryT} name='selectedCategoryT' onChange={this.onChange}>                                    
                                              {Mens[1].Shirts.map((item,index) =>{
                                              return (
                                                  <option key='index' value={item} > {item} </option>
                                              )
                                              })
                                              }                                         
                                              </select>
                                              ) : void 0
                                     :
                                          selectedCategory==='Womens'  ?
                                           selectedCategoryS==='Kurty' ?
                                          (<select className='col-12' style={{marginTop: '10px'}} value={selectedCategoryT} name='selectedCategoryT' onChange={this.onChange} >   
                                          {/* <option>Select In Mens</option>                                  */}
                                          {Womens[0].Kurty.map((item,index) =>{
                                              return (
                                                  <option key='index' value={item} > {item} </option>
                                              )
                                              })}                                         
                                              </select>
                                              )
                                              :  selectedCategoryS==='Suits'?
                                              (<select className='col-12' style={{marginTop: '10px'}} value={selectedCategoryT} name='selectedCategoryT' onChange={this.onChange}>                                    
                                              {Womens[1].Suits.map((item,index) =>{
                                              return (
                                                  <option key='index' value={item} > {item} </option>
                                              )
                                              })}                                         
                                              </select>
                                              ) : void 0
                                              :
                                     void 0
                                            }
                                </div>

                             
                            </form>
                        </div>
                   
                    </div>

                    <div className='col' >
                        <div className='' >
                            <div  >
                                <button type='button' onClick={this.onSubmit.bind(this)} className='btn' style={{padding: '4px 30px', backgroundColor: '#FF4747', fontWeight: '600',fontSize: '19px',color: '#ffffff'}} >Update Product </button>
                                <hr/>
                                <p className='editStatus' >Product Status: <span style={{fontWeight: 'bolder'}} >Online </span> <span className='editKaUpdate' style={{backgroundColor: 'limegreen', color: '#ffffff', padding: '4px 8px', margin: '10px'}} > Edit </span> </p>
                                <p className='editStatus'>Product Type: <span style={{fontWeight: 'bolder'}} >Simple Product </span> <span className='editKaUpdate' style={{backgroundColor: 'limegreen', color: '#ffffff',padding: '4px 8px'}} > Edit </span> </p>
                                <hr/>
                                <p className='imageGallery' > Image Gallery </p>
                                <p className='imageGalleryBtn btn btn-success' > + Add Product Images </p>

                            </div>
                        </div>
                    </div>
                </div>
                </div>

                <div className='prodDecrip container' >
                    <div classNam='row' >
                        <div className='col-8' >
                               {/* <textarea id="w3mission" rows="4" cols="50" style={{width: '100%'}} >Price description</textarea> */}
                        </div>
                        <div className='col-3' >
                             
                        </div>
                       
                    </div>
                </div>

                <div className='row' style={{marginLeft: '10px'}}>
                  <h2>Inventory Section</h2>
                </div>
                
                <hr style={{border: '1px solid #999'}} />
                <div className='row' style={{marginLeft: '10px'}} >
                  <div className='col' >
                    <div class="form-group">
                        {/* <label for="exampleInputEmail1">Email address</label> */}
                        <select name='color' value={this.state.color} onChange={this.onChange}>
                            <option >Select Any color</option>
                            <option value='red'>red</option>
                            <option value='green'>green</option>
                            <option value='black'>black</option>
                            <option value='brown'>brown</option>
                            <option value='brown'>brown</option>
                            <option value='brown'>brown</option>
                            <option value='yellow'>yellow</option>
                        </select>
                        {/* <input type="text" name='color' value={this.state.color} onChange={this.onChange} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Color"/> */}
                        <small id="emailHelp" class="form-text text-muted">Product Image Color </small>
                    </div>                      
                  </div>
                  <div className='col' >
                     <div class="form-group" style={{backgroundColor: '',textAlign:'center',cursor:'pointer'}} onClick={this.imagePicker.bind(this)} >
                        { this.state.imagePicker===false ? 
                        <i class="fa fa-camera-retro"></i>:
                        <img width='60' height='60' src={this.state.image} />
                    }
                        <small id="emailHelp" class="form-text text-muted">Product Image  </small> 
                        <input type='file'  style={{display: 'none'}}  ref="fileUploader" onChange={this.imageOnChange} />
                     </div>
                     {/* : */}
                      
                        {/* } */}
                  </div>
                  <div className='col' >
                    <div class="form-group">
                        {/* <label for="exampleInputEmail1">Email address</label> */}
                        <select name='size' value={this.state.size} onChange={this.onChange}>
                            <option >Select Any Size</option>
                            <option value='small'>small</option>
                            <option value='asian Small'>asian Small</option>
                            <option value='Medium'>Medium</option>                          
                        </select>
                        {/* <input type="number"  class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Size"  /> */}
                        <small id="emailHelp" class="form-text text-muted">Product Size Vise </small>
                    </div>
                  </div>
                  <div className='col' >
                    <div class="form-group">
                        {/* <label for="exampleInputEmail1">Email address</label> */}
                        <input type="number" name='stock' value={this.state.stock} onChange={this.onChange} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Stock"  />
                        <small id="emailHelp" class="form-text text-muted">Product Stock Color Vise </small>
                    </div>
                  </div>
                  <div className='col' >
                    <div class="form-group">
                       <button onClick={this.prodInfo.bind(this)} className='btn btn-block btn-primary'>Add</button>
                    </div>
                  </div>
                </div>

            <div className='row' style={{marginLeft: '10px',marginBottom: '20px'}}>
                <table class="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Color</th>
                        <th scope="col">Image</th>
                        <th scope="col">Size</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.prodInfo!==undefined ? 
                        this.state.prodInfo.map((item,index) => {
                            return (
                                <tr key={index} >
                                    <th scope="row"> {index+1} </th>
                                    <td>{item.color}</td>
                                    <td><img src={item.image}  width='90' height='90' /></td>
                                    <td> {
                                        item.sizeViseStock.map((i,ind) => {
                                           return ( <span style={{padding:'2px'}} > {i.size} <br/> </span>)
                                        })
                                        } </td>
                                   <td> {
                                        item.sizeViseStock.map((i,ind) => {
                                           return (   <span style={{padding:'2px'}} > {i.stock}<br/>  </span>  )
                                        })
                                        } </td>
                                    <td style={{colro:'red',fontWeight:'600'}} onClick={this.delProdInfo.bind(this,index)}>  X </td>
                                </tr>
                            )
                        })
                        :
                             <tr>
                                <th scope="row"> 0</th>
                                <td>choose any color</td>
                                <td>choose any image</td>
                                <td> put stock </td>
                             </tr>
                        }                       
                    </tbody>
                </table>
            </div>

            <div className='row' style={{marginLeft:'10px'}}>
                <h2>Keyword Section
                    <br/>
                 <span style={{color:'red',fontSize:'12px'}} >This keywords will help your product to make searchable on top</span>
                </h2>                
            </div>

            <hr style={{border: '1px solid #999'}} />           

            <div className='row' >
              <div className='col' >
                <input class="form-control" type='text' placeholder='Keyword' width='100' value={this.state.keyword} onChange={this.onChange} name='keyword' /><br/>
                <button className='btn btn-success btn-block' onClick={(e) => { let {keywords,keyword}=this.state;let arr= this.state.keywords;  
                    let filtered= keywords.filter(e => {return  e === keyword })
                    if(filtered.length==0){ arr.push(this.state.keyword); this.setState({keywords:arr});}
                    // else{}
            }} >Submit</button>
              </div>
              <div className='col' style={{textAlign:'left'}} >
                <h4>Keywords List</h4>
                <ol  >
                    {this.state.keywords.map((item,index) => {
                        return (
                            <li key={index} > {item} </li>
                        )
                    })}
                </ol>
              </div>
            </div>

            </div>  

         );
    }
}
 
// redux
const mapStateToProps = state => {
    console.log('vendor Add product sy',state)
    return {
        storeId: state.vendor.storeInfo._id,
        storeInfo: state.vendor.storeInfo,
        editProduct:state.vendor.editProduct,
        updateProduct:state.vendor.updateProduct,
    }
}
export default connect(mapStateToProps,{updateProduct})(Edit);