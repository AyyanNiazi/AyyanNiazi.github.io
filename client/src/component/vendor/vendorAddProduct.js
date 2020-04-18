import React, {Component} from 'react';
import {addProduct} from '../../store/actions/adminAction'
import { connect } from 'react-redux';
import './style/addProduct.css'

let prodInfo=[];
let log = console.log
class AddProduct extends Component {
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
            checked: false,
            schedule: false,
            imgToggle: false,
            imagePicker: false,
            delInventory:false,
            selectedCategory: '',
            selectedCategoryS: '',
            selectedCategoryT: '',
            sku:'',
            threshhold:'',
            inventoryQuantity:'',
            upSearch:'',
            crSearch:'',
            crSellProduct:[],
            upSellProduct: [],
            mQuantity:'',
            pDiscount:'', 
            linkedProduct: undefined,
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
    // imagePicker(){
    //     this.setState({
    //         imagePicker: true
    //     })
    // }
    delProdInfo(index){
        let arr = this.state.prodInfo;
        arr.splice(index,1);

        this.setState({
            prodInfo:arr
        })
    }
    delInventory(index,ind){
        let filtered = this.state.prodInfo[ind];
        console.log(filtered)
        let milgai = filtered.sizeViseStock
        milgai.splice(index,1);
        console.log(filtered)
        let newInventr =prodInfo
        newInventr[ind].sizeViseStock=milgai
        this.setState({
                prodInfo:newInventr,
                // delInventory:true
            })
        console.log(newInventr,prodInfo)
        // console.log(filtered,newInventr)
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
            imagePicker:false,
            delInventory:false
        })


    }

    delKeyword(index){
        let filtered= this.state.keywords;
        filtered.splice(index,1);
        this.setState({
            keywords:filtered
        })
    }

    componentDidMount() {
        if(this.props.products){
            this.setState({
                linkedProduct: this.props.products
            })
        }
    }
    crProdSelect(item){
        let crSellArr = this.state.crSellProduct;
    
        crSellArr.push({name:item.name,id:item._id})
        if(this.state.crSellProduct &&  crSellArr){
    
            this.setState({
                crSellProduct:crSellArr
            })
        }
    }
    
    upProdSelect(item){
        let upSellArr = this.state.upSellProduct;
    
        upSellArr.push({name:item.name,id:item._id})
        if(this.state.upSellProduct && upSellArr){
    
            this.setState({
                upSellProduct:upSellArr
            })
        }
    }

    delUpProdSelect(index){
        let filtered = this.state.upSellProduct;
        filtered.splice(index,1)
        this.setState({
            upSellProduct:filtered
        })
    }

    delCrProduct(index){
        let filtered = this.state.crSellProduct;
        filtered.splice(index,1)
        this.setState({
            crSellProduct:filtered
        })
    }

    onSubmit=(e) => {
        e.preventDefault();

       const { name,sku,threshhold,inventoryQuantity, upSellProduct,crSellProduct,mQuantity,pDiscount, 
         keywords,description,price,prodInfo,initialDate,lastDate, discountedPrice,selectedCategory,selectedCategoryS,
         selectedCategoryT } = this.state;
       console.log(this.state.initialdate,this.state) 
       let newProduct = {
        name, description,price,initialDate,lastDate, 
        discountedPrice,selectedCategory,selectedCategoryS,
        selectedCategoryT,prodInfo,storeId:this.props.storeId,
        storeName:this.props.storeInfo.storeInfo[0].name,keywords,
        sku,threshhold,inventoryQuantity,upSellProduct,crSellProduct,mQuantity,pDiscount:pDiscount.substr(0,2), 
         
        }
        // this.props.addProduct(newProduct);
        console.log(newProduct)
    }
    render() { 
        const {selectedCategory,sku,threshhold,inventoryQuantity,crSearch,upSearch,mQuantity,pDiscount, upSellProduct,crSellProduct,
            selectedCategoryS,categoryS,categoryF,Mens,Womens,selectedCategoryT,initialDate,lastDate} = this.state
        let discount ;
        let upSellLinkedProduct= []
        let crSellLinkedProduct= []
        if(this.props.products){
            upSellLinkedProduct = this.props.products.filter(e => {
                return e.name.toLowerCase().indexOf(this.state.upSearch.toLowerCase()) !== -1
            })
            crSellLinkedProduct = this.props.products.filter(e => {
                return e.name.toLowerCase().indexOf(this.state.crSearch.toLowerCase()) !== -1
            })
        }
        console.log(crSellLinkedProduct,upSellLinkedProduct,this.state);
        // console.log
        return ( 
            <div>

                <div className='container' >
                    <div className='row' >
                        <div className='col' >
                            <form>
                                {/* Prdct name */}
                                <div class="form-group">
                                    <label for="exampleInputEmail1">product Name</label>
                                    <input type='text' value={this.state.name} name='name' onChange={this.onChange}  placeholder='product Name' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                {/* prdct price */}
                                <div class="form-group">
                                    <label for="exampleInputPassword1">price</label>
                                    <input  type='number'  value={this.state.price} name='price' onChange={this.onChange} placeholder='Product price' class="form-control" id="exampleInputPassword1" />
                                </div>
                                    {/* discntd price */}
                                <div class="form-group">
                                    <label for="dPrice" style={{ cursor:'pointer'}} >Discounted price <input style={{width:'20px',height:'20px'}} onClick={this.checked.bind(this)} type='checkbox'  placeholder='Discounted price'  id="dPrice" />
                                    
                                    </label>
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
                                </div>
                                    {/* Select Categories */}
                                <div class="form-group">
                                <select className='col-12 form-control' style={{marginTop: '10px'}}  value={selectedCategory} name='selectedCategory' onChange={this.onChange} >
                                        <option selected>Category...</option>
                                        {categoryF.map((item,index) => {
                                            return (
                                                <option key={index} value={item} > {item} </option>
                                            )
                                        })}
                                    </select>
                                    {  selectedCategory!==''?
                                        selectedCategory==='Mens'? 
                                        (<select className='col-12 form-control' style={{marginTop: '10px'}} value={selectedCategoryS} onChange={this.onChange} name='selectedCategoryS' >                                    
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
                                          (<select className='col-12 form-control' style={{marginTop: '10px'}} value={selectedCategoryS} onChange={this.onChange} name='selectedCategoryS'>                                    
                                            {categoryS[1].Womens.map((item,index) =>{
                                                return (
                                                    <option key='index' value={item} > {item} </option>
                                                )
                                             })}                                         
                                             </select>
                                             ) : selectedCategory==='Childrens'?
                                             (<select className='col-12 form-control' style={{marginTop: '10px'}} value={selectedCategoryS} onChange={this.onChange} name='selectedCategoryS'>                                    
                                               {categoryS[2].Childrens.map((item,index) =>{
                                                   return (
                                                       <option key='index' value={item} > {item} </option>
                                                   )
                                                })}                                         
                                                </select>
                                                ) :  selectedCategory==='Others'?
                                                (<select className='col-12 form-control'  style={{marginTop: '10px'}} value={selectedCategoryS} onChange={this.onChange} name='selectedCategoryS'>                                    
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
                                          (<select className='col-12 form-control' style={{marginTop: '10px'}} value={selectedCategoryT} name='selectedCategoryT' onChange={this.onChange} >                                            
                                          { Mens[0].Pents.map((item,index) =>{
                                              return (
                                                  <option key='index' value={item} > {item} </option>
                                              )
                                              })
                                              }                                         
                                              </select>
                                              )
                                              :  selectedCategoryS==='Shirts'?
                                              (<select className='col-12 form-control' style={{marginTop: '10px'}} value={selectedCategoryT} name='selectedCategoryT' onChange={this.onChange}>                                    
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
                                          (<select className='col-12 form-control' style={{marginTop: '10px'}} value={selectedCategoryT} name='selectedCategoryT' onChange={this.onChange} >   
                                          {/* <option>Select In Mens</option>                                  */}
                                          {Womens[0].Kurty.map((item,index) =>{
                                              return (
                                                  <option key='index' value={item} > {item} </option>
                                              )
                                              })}                                         
                                              </select>
                                              )
                                              :  selectedCategoryS==='Suits'?
                                              (<select className='col-12 form-control' style={{marginTop: '10px'}} value={selectedCategoryT} name='selectedCategoryT' onChange={this.onChange}>                                    
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

                        <div className='col' >
                         {!this.state.image? 
                            <div id='editProdImage'  onClick={this.imagePicker.bind(this)} >
                                <div className='imgCenter' >
                                        <i class="fa fa-cloud" style={{color: '#c7c3c3', fontSize: '60px'}} ></i>
                                        <p>Upload Product Cover Image</p>
                                </div>                                         
                            </div>
                            :
                            <div id='AgaiProdImage'  onClick={this.imagePicker.bind(this)} >
                                <div className='imgCenter' >
                                    <img src={this.state.image} width='300' height='300' />
                                </div>                                         
                            </div>
                            }
                        </div>

                    </div>

                    {/* second row keyword Section */}

                        <div className='row'  >
                        <div className='col' style={{border:'1px solid #999',padding:'0px'}}>
                            <div style={{backgroundColor:"#cfcdcd",height:'',padding:'5px'}} >                                 
                                <h2  style={{backgroundColor:"#cfcdcd",height:'',padding:'5px',margin:'0px',height:'4vh'}}>keyword Section   </h2>
                            </div>
                                
                            
                            <div className='row' style={{marginTop:'10px'}}>
                                <div className='col' >
                                 <input class="form-control" type='text' placeholder='Keyword' width='100' value={this.state.keyword} onChange={this.onChange} name='keyword' /><br/>
                                </div>
                                <div className='col' >
                                    <button className='btn btn-success btn-block' onClick={(e) => { let {keywords,keyword}=this.state;let arr= this.state.keywords;  
                                    let filtered= keywords.filter(e => {return  e === keyword })
                                    if(filtered.length==0){ arr.push(this.state.keyword); this.setState({keywords:arr,keyword:''});}
                                    // else{}
                                    }} >Submit</button>
                                </div>
                            </div>

                        {/* <h4>Keywords List</h4> */}
                            {/* <ol  > */}
                                {this.state.keywords? this.state.keywords.map((item,index) => {
                                    return (
                                        <div className='col-8' onClick={this.delKeyword.bind(this,index)} key={index} style={{width:'100%',padding:'10px',backgroundColor:'#fff',border:'1px solid #999',borderRadius:'8px',margin:'5px'}} > <span> {index+1}: </span> {item}  <span style={{paddingLeft:'10px',color:'red',fontSize:'16px',fontWeight:'600',cursor:'pointer',float:'right'}} > X </span> </div>
                                    )
                                }) :void 0 }
                            {/* </ol> */}
                        </div>
                        <div className='col' style={{textAlign:'left',backgroundColor:'#fff',borderRadius:'10px'}} >
                            <h3> <i class="fa fa-comment" style={{color:'#1579ee',fontSize:'26px'}}></i> Keyword Tips:</h3>
                            <hr/>
                            <h4> <i class="fa fa-check" style={{color: 'limegreen',fontSize:'24px'}}></i> This Keywords Will Help you to find Product Easily</h4>
                            <h4> <i class="fa fa-check" style={{color: 'limegreen',fontSize:'24px'}}></i>More Keywords Will increase your </h4>
                            <h4><i class="fa fa-check" style={{color: 'limegreen',fontSize:'24px'}}> </i> e.g beatuful shirts , mens shirt , mens wear, </h4>
                        </div>
                    </div>

                    <div className='row'style={{marginTop:'10px',paddingRight:'0px'}} >
                        <div className='col-6' style={{paddingLeft:'0px'}} >
                        <div class="form-group">
                            <div style={{borderRadius:'2px',border:'1px solid #999'}} >
                                <div style={{backgroundColor:"#cfcdcd",height:'5vh',padding:'10px'}} >
                                    <label for="exampleFormControlTextarea1">Product Description</label>
                                </div>
                                <div>
                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
            
                                    {/* Stock Management */}
                                    
                    <div className='row'style={{marginTop:'10px',paddingRight:'0px'}} >
                        <div className='col' style={{paddingLeft:'0px'}} >
                            <div class="form-group">
                                <div style={{borderRadius:'2px',border:'1px solid #999'}} >
                                    <div style={{backgroundColor:"#cfcdcd",height:'5vh',padding:'10px'}} >
                                        <label for="exampleFormControlTextarea1">Stock Management</label>
                                    </div>

                                    <div className='row' >
                                        <div className='col-4' style={{padding: '10px'}} id='stockL' >
                                            <div className='form-group col-12' id='stockImg'>                                               
                                                <span>Choose Image For Stock</span>                                          
                                                 <input type='file'  style={{display: 'none'}}  ref="fileUploader" onChange={this.imageOnChange} /> 
                                                 {
                                                     !this.state.image?
                                                     <i style={{fontSize:'50px',cursor:'pointer',paddingLeft:'30px'}} class="fa fa-image"  onClick={this.imagePicker.bind(this)}></i>                                                
                                                     :
                                                     <img style={{fontSize:'50px',cursor:'pointer',paddingLeft:'30px'}}  src={this.state.image} width='80' height='80' onClick={this.imagePicker.bind(this)}/>
                                                 }                                           
                                            </div>
                                            <div class="form-group col-12"  >
                                                <label for="colorselector">Color</label>
                                                <select class="form-control" id="colorselector" name='color' value={this.state.color} onChange={this.onChange}>
                                                    <option >Select Any color</option>
                                                    <option value='red'>red</option>
                                                    <option value='green'>green</option>
                                                    <option value='black'>black</option>
                                                    <option value='brown'>brown</option>
                                                    <option value='babyPink'>babyPink</option>
                                                    <option value='offwhite'>off White</option>
                                                    <option value='grey'>grey</option>
                                                    <option value='pink'>pink</option>
                                                    <option value='yellow'>yellow</option>
                                                    <option value='blue'>blue</option>
                                                </select>
                                            </div>

                                            <div class="form-group col-12">
                                              <label for="sizeselector">Size</label>
                                              <select className='form-control' id='sizeselector' name='size' value={this.state.size} onChange={this.onChange}>
                                                <option >Select Any Size</option>
                                                <option value='small'>small</option>
                                                <option value='asian Small'>asian Small</option>
                                                <option value='Medium'>Medium</option>                          
                                              </select>
                                            </div>

                                            <div className='form-group col-12' >
                                              <label for='stockApna' >Stock</label>
                                              <input type="number" name='stock' value={this.state.stock} onChange={this.onChange} class="form-control" id="stockApna" aria-describedby="emailHelp" placeholder="Enter Stock" />                                                
                                            </div>

                                            <div className='form-group col-12'>
                                                <button className='btn btn-block btn-primary' onClick={this.prodInfo.bind(this)} > Add Stock </button>
                                            </div>
                                        </div>

                                        <div className='col-8' id=''>
                                            <div className='row' >
                                             {this.state.prodInfo.length==0? (<p>Fill the stock</p>) 
                                             :
                                             this.state.prodInfo.map((item,index) => {
                                                 return (
                                                    <div className='col-3' id='stockR' >
                                                        <span className='btn btn-danger' style={{padding:'5px',position:'absolute',top:0,right:0,fontSize:'14px',fontWeight:600,cursor:'pointer'}} onClick={this.delProdInfo.bind(this,index)}>X</span>
                                                        <img src={item.image}  />
                                                        <p>Color <span style={{color:'black',fontWeight:'400'}} > {item.color} </span> </p>
                                                        <table class="table">
                                                            <thead>
                                                                <tr>
                                                                    {/* <th scope='col'> Sr </th>  */}
                                                                    <th scope='col' >Stock</th>
                                                                    <th scope='col' > Size</th>
                                                                    {/* <th scope='col' > </th> */}
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {item.sizeViseStock.map((i,ind) => {
                                                                    return (
                                                                        <tr>
                                                                            {/* <th scope='row'> {ind+1} </th> */}
                                                                            <td> {i.stock}</td>
                                                                            <td> {i.size}</td>
                                                                            <td> <span onClick={this.delInventory.bind(this,ind,index)}  className='btn  btn-danger'  style={{color:'#fff',fontWeight:500}}> X </span></td>
                                                                        </tr>
                                                                    )
                                                                })}
                                                            </tbody>
                                                        </table>
                                                        {/* <button id='delAllStock' type='button'  className='btn btn-block btn-danger' > Delete </button> */}
                                                    </div>                                                
                                                 )
                                             })
                                            } 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        
                    </div>
                     
                        {/* Inventory SKU */}

                    <div className='row'style={{marginTop:'10px',paddingRight:'0px'}} >
                        <div className='col-12' style={{padding:'0px',borderRadius:'2px',border:'1px solid #999'}} >
                         <div class="form-group">
                            <div >
                                <div style={{backgroundColor:"#cfcdcd",height:'5vh',padding:'10px'}} >
                                    <h4 style={{margin:'0px'}} >SKU (Stock Keeping Unit)</h4>
                                </div>
                                <div className='form-group' style={{padding:'10px'}} >
                                   <label for="sku">Inventory Sku</label>     
                                   <input id='sku' type='text'  name='sku' value={sku} onChange={this.onChange} className='form-control' placeholder='Inventory Sku' />                               
                                </div>
                            </div>
                         </div>

                            <div className='row' style={{margin:'10px'}} >
                                <div className='col-6' >
                                    <label for="sqnty">Inventory Quantity</label>     
                                    <input id='sqnty'  name='inventoryQuantity' value={inventoryQuantity} onChange={this.onChange} type='number' className='form-control' placeholder='Inventort Quantity' />
                                    </div>
                                    <div className='col-6' >
                                    <label for="thrsh">Low Stock threshhold</label>     
                                    <input id='thrsh' name='threshhold' value={threshhold} onChange={this.onChange} type='number' className='form-control' placeholder='Threshhold' />
                                </div>
                            </div>
                        </div>
                    </div>

                                    {/* Discount On Quantity1 */}

                    <div className='row' style={{marginTop:'10px'}}>
                      <div className='col-12' style={{padding:'0px',textAlign:'left'}}>
                      <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#multiCollapseExample2" style={{width:'100%',fontSize:'20px',textAlign:'left'}}
                       aria-expanded="false" aria-controls="multiCollapseExample2"> <i className='fa fa-gift' ></i> Discount Options <span>  (Set your discount for this product) </span>
                       </button>
                      </div>
                    </div>
                    <div class="row">
                        <div class="col" style={{padding:'0px'}}>
                            <div class="collapse multi-collapse row" id="multiCollapseExample2" style={{margin:'10px'}}>
                            <div class="card card-body row" style={{margin:'10px'}}>
                                <div className='col-6' style={{float:'left'}} >
                                  <div className='form-group' >
                                    <label for="dq">Minimum Quantity</label>     
                                    <input id='dq' type='number' name='mQuantity' value={mQuantity} onChange={this.onChange} className='form-control' placeholder='Minimum Quantity for discount' />
                                  </div>
                                </div>
                                <div className='col-4' >
                                  <p style={{color:'red', fontWeight:600}}> Reached Price:  {discount= this.state.price*this.state.mQuantity} </p>
                                </div>
                                <div className='col-6' >
                                  <div className='form-group' >
                                    <label for="dfnl">Discount %</label>     
                                    <input id='dfnl' type='number' name='pDiscount'  value={pDiscount.substr(0,2)} onChange={this.onChange}  className='form-control' placeholder='Discount Must be in Percentage ' min='1' max='99' />
                                  </div>
                                </div>
                                <div className='col-4' >
                                  <p style={{color:'red', fontWeight:600}}> Deducted Price:  { (discount/100)*this.state.pDiscount } </p>                                    
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>

                  

                    <div className='row' style={{marginTop:'20px',border:'1px solid #999'}} > 
                        <button className='btn btn-block btn-primary' data-toggle="collapse" data-target="#multiCollapseExample3" style={{width:'100%',fontSize:'20px',textAlign:'left'}}
                        aria-expanded="false" aria-controls="multiCollapseExample3" >
                            <i class="fa fa-link"></i> Linked Product
                            {/* <i style={{textAlign:'right'}}  class="fa fa-sort-down"></i>                               */}
                        </button>
                    </div>

                    <div  class="collapse multi-collapse row" id="multiCollapseExample3"  style={{marginTop:'20px'}} >
                        <div className='row ' >
                                                {/* Up Sell Product Section starting from here */}
                            <div className='col-6' >
                                <label for="usell">Upsells</label>     
                                <input id='upsell' type='text' name='upSearch' value={upSearch} onChange={this.onChange}  className='form-control' placeholder='Search in your Products  ' />
                                <div className='row' >
                                    <div className='col-6' >
                                        <ol style={{paddingLeft:'20px'}} >
                                                {upSellLinkedProduct.length==0 || upSearch==='' ? void 0 :
                                                upSellLinkedProduct.map((item,index) => {
                                                    return (
                                                            <li style={{padding: '10px'}} > {item.name}  
                                                                <span>  <button type='button' onClick={this.upProdSelect.bind(this,item)}
                                                                 className='btn btn-success' style={{paddingLeft:'5px',float:'right'}} > Select </button> </span> 
                                                            </li>
                                                        )
                                                    })
                                                }
                                        </ol>
                                    </div>
                                    <div className='col-6' >
                                       <ol  >
                                                {!this.state.upSearch ||  !this.state.upSellProduct ? void 0 :
                                                upSellProduct.map((item,index) => {
                                                    return (
                                                            <li style={{border: '1px solid black',borderRadius: '4px', marginTop:'5px',padding: '10px'}} > {item.name}  
                                                            <span  onClick={this.delUpProdSelect.bind(this,index)} 
                                                                style={{paddingLeft:'5px',color:'red',fontSize:'16px',
                                                                textAlign:'justify', fontWeight:600,float:'right',cursor:'pointer'}} >X</span> 
                                                            </li>
                                                        )
                                                    })
                                                }
                                        </ol>
                                    </div>
                                </div>
                            </div>
                                                {/* Cros Sell Product Section starting from here */}
                            <div className='col-6' >
                              <label for="csell">Cross-sells</label>     
                              <input id='csell' type='text' name='crSearch' value={crSearch} onChange={this.onChange} className='form-control' placeholder='Search in your Products ' />
                              
                              <div className='row' >
                                    <div className='col-6' >
                                        <ol style={{paddingLeft:'20px'}} >
                                                {crSellLinkedProduct.length==0 || crSearch==='' ? void 0 :
                                                crSellLinkedProduct.map((item,index) => {
                                                    return (
                                                            <li style={{padding: '10px'}} > {item.name}  
                                                                <span>  <button type='button' onClick={this.crProdSelect.bind(this,item)} className='btn btn-success' 
                                                                style={{paddingLeft:'5px',float:'right'}} > Select </button> </span> 
                                                            </li>
                                                        )
                                                    })
                                                }
                                        </ol>
                                    </div>
                                    <div className='col-6' >
                                        <ol  >
                                                {!this.state.crSearch &&  !this.state.crSellProduct ? void 0 :
                                                crSellProduct.map((item,index) => {
                                                    return (
                                                            <li style={{border: '1px solid black',marginTop:'5px', borderRadius: '4px', padding: '10px',}} > {item.name}  
                                                                <span onClick={this.delCrProduct .bind(this,index)}
                                                               style={{paddingLeft:'5px',color:'red',fontSize:'16px',fontWeight:600,float:'right',cursor:'pointer'}} > X </span> 
                                                            </li>
                                                        )
                                                    })
                                                }
                                        </ol>
                                    </div>
                                </div>         
                            </div>
                        </div>
                    </div>

                    <div class="alert alert-primary" role="alert" style={{marginTop:'10px'}} >
                    <i style={{fontSize:'30px', colro:'yellow'}} class="fa fa-sticky-note"></i> Linked Product will be Show on your main product section to boost your sales so Enter Relevent products only <br/>
                     <span style={{fontWeight:600}} >   Upsells Product: </span> You sell Your expensive Product to customer than choosen product by customer <br/>
                     <span style={{fontWeight:600}} >    Cross Sell: </span> You sell your alternative product to customer with selected product by customer
                    </div>

                    <div className='row' >
                      <div className='col-12' >
                      <button className='btn btn-block btn-warning' type='button' onClick={this.onSubmit.bind(this)} 
                      style={{padding: '4px 30px', backgroundColor: '#FF4747', fontWeight: '600',fontSize: '19px',color: '#ffffff'}} >Post Product </button>
                      </div>
                    </div>

                </div>
                <br/>
                <br/>
                <br/>
                <br/>
           
            </div>  

         );
    }
}

 
// redux
const mapStateToProps = state => {
    console.log('vendor Add product sy',state.vendor)
    return {
        storeId: state.vendor.storeInfo._id,
        storeInfo: state.vendor.storeInfo,
        products: state.vendor.products
    }
}
export default connect(mapStateToProps,{addProduct})(AddProduct);