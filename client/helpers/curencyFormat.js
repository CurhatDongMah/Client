export default function curencyFormat(price){
  return `IDR ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".")},00`
}
