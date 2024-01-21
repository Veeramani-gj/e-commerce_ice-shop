const navmenu = document.querySelector(".list");
const bar = document.querySelector("#bar");
// console.log(navmenu)

bar.addEventListener('click',() => {
   navmenu.classList.toggle('pop-up');
})

const cartbox = document.querySelector(".cart-icon");
const doticon = document.querySelector(".dot");

doticon.addEventListener('click',()=> {
    cartbox.classList.toggle('cart-view');
})


// image slider 

let slidePosition = 0;
const sliders = document.querySelectorAll(".image-slider");
// console.log(slider)
const totalslider = sliders.length;

const prevbtn = document.querySelector("#prev-btn");
const nextbtn = document.querySelector("#next-btn");

prevbtn.addEventListener('click',()=>{
    PrevSlide();
});
nextbtn.addEventListener('click',()=>{
    NextSlide();
});

function Updateposition() {
    sliders.forEach(slide=>{
        slide.classList.remove('active');
        slide.classList.add('hidden');
    })
    sliders[slidePosition].classList.add('active');
};

function PrevSlide() {
    if(slidePosition==0){
        slidePosition=totalslider-1;
      }else{
        slidePosition--;
      }
      Updateposition();
    }
    function NextSlide(){
        if(slidePosition==totalslider-1){
            slidePosition=0;
        }else{
            slidePosition++;
        }
        Updateposition();
      }
      setInterval(()=>{
        if(slidePosition==totalslider-1){
          slidePosition=0;
        }else{
          slidePosition++;
        }
        Updateposition();
      },4000);



  // -------------------Add Cart Code

  const cartshow = document.querySelector('#cart-click');
  const cartcontent = document.querySelector('.cart-container');
  const cartclose = document.querySelector('#cart-close')


  cartshow.addEventListener('click',()=> {
    cartcontent.classList.add('cart-active');
  });

  cartclose.addEventListener('click',()=> {
    cartcontent.classList.remove('cart-active');
  })

  document.addEventListener('DOMContentLoaded',()=>{
    loadcontent();
  });

  function loadcontent() {
    //remove product from cart
    let btnremove = document.querySelectorAll('#trash');
    btnremove.forEach((btn)=>{
      btn.addEventListener('click',Removeitem);
    })
     //Add product from cart
    let addcartbtns = document.querySelectorAll('.addcart');
       addcartbtns.forEach((btn)=>{
        btn.addEventListener('click',addcart);
    })
    //product item change event
    let qtyElements=document.querySelectorAll('.cart-quantity');
    qtyElements.forEach((input)=>{
      input.addEventListener('change',changeQty);
    });
    Updatetotal();
  }

  //remove item
 function Removeitem() {
  if(confirm('Your Sure To Remove')) {
  let title = this.parentElement.querySelector('.product-name').innerHTML;
  // console.log(title)
  itemlist=itemlist.filter((e)=>e.title!=title)
  this.parentElement.remove();
  loadcontent();
  }
 } 
 //change quantity
function changeQty(){
  if(isNaN(this.value) || this.value<1){
    this.value=1;
  }
  Updatetotal();

}

 let itemlist = [];
 //Add Cart Item
 function addcart() {
  let food = this.parentElement;
  let title = food.querySelector('.price-title').innerHTML;
  let price = food.querySelector('.price-amt').innerHTML;
  let img = food.querySelector('#cart-pic').src;
  let newproducts = {title,price,img};
  // console.log(newproducts)

  //check Products Already in Card
  if(itemlist.find((el)=>el.title == newproducts.title)) {
    alert("product already in a card");
    return;
  }else {
    itemlist.push(newproducts);
  }
  let newproductselement = cardcreate(title,price,img);
  let element = document.createElement('div');
  element.innerHTML = newproductselement;
  let cartbag = document.querySelector('.cart-content');
  cartbag.append(element);
  loadcontent();
 }

function cardcreate(title,price,img) {
  return `
  <div class="cart-box">
  <div class="image-cart">
      <img src="${img}"/>
  </div>
  <div class="product-price">
      <p class="product-name">${title}</p>
      <div class="price-box">
          <div class="cart-price">${price}</div>
          <div class="cart-amt">${price}</div>
      </div>
      <input type="number" value="1" class="cart-quantity"/>
  </div>
  <i class="fa-solid fa-trash" id="trash"></i>
</div>
  `
}





//update Total 

function Updatetotal() {
  const cardItem = document.querySelectorAll('.cart-box');
  const totalvalue = document.querySelector('.total-price');
  let total=0;
  cardItem.forEach(product=> {
    let priceelement = product.querySelector('.cart-price');
    let price = parseFloat(priceelement.innerHTML.replace("$",""));
    let qty = product.querySelector('.cart-quantity').value;
    total+=(price*qty);
    product.querySelector('.cart-amt').innerText="$"+(price*qty);
});
    totalvalue.innerHTML='$'+total;




    //cart count in cart-icon
const cartcount = document.querySelector('.cart-count');
let count = itemlist.length;
// console.log(count);
cartcount.innerHTML=count;

  if(count==0){
    cartcount.style.display='none';
  }else{
    cartcount.style.display='block';
  }
}

   

