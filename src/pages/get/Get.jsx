import './Get.css'

export default function Get () {
    const resource = new URLSearchParams(window.location.search);
    const current = resource.get('current');
    console.log(current);
    
    
}