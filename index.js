let isMobile = false 

// device detection
function checkIsMobile(){
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
        isMobile = true
    }
}
checkIsMobile()
window.addEventListener('resize', checkIsMobile)

const main = document.querySelector('main')
const scrollContainer = document.querySelector('.container')
const contentSlider = document.querySelector('.content__slider')
const projects = document.querySelectorAll('.project')
const projectsTotal = projects.length 
const projectName = document.querySelector('.project__name')
const projectNames = ['Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5']

scrollContainer.style.height = `${projectsTotal * 100}%`

let rounded = 0
function snap(){ // 스크롤했다가 놓으면 50ms 후에 snap 함수가 실행되어 rounded 에 해당하는 위치로 슬라이드가 이동함 (snap)
    main.scrollTo(0, window.innerHeight * rounded)
    projectName.innerText = projectNames[rounded]
    let span = document.createElement('span')
    span.className = 'flash'
    projectName.appendChild(span)
}
let snapTimeout = setTimeout(snap, 50)

if(!isMobile){
    main.addEventListener('scroll', () => {
        clearTimeout(snapTimeout)
        // console.log(main.scrollTop)
        let scroll = (main.scrollTop / window.innerHeight) * 100 // 브라우저 높이 대비 몇 % 스크롤했는지
        // console.log(scroll) // 최대값은 400%. 사진이 총 5장이라 총 컨텐츠 길이가 500%이고 첫번째 사진을 제외한 만큼 스크롤하므로 400%만큼 스크롤 가능.
        rounded = Math.round(scroll / 100)
        console.log(rounded) // 3번째 사진이 절반이상 브라우저 화면에 보이면 3
        snapTimeout = setTimeout(snap, 50)
        contentSlider.style.transform = `translate3d(${-scroll}vw, 0, 0)` // 스크롤할때마다 움직임
    
    })
}

// Mobile
let touchStart = 0
let touchEnd = 0

if(isMobile){
    contentSlider.style.transition = '.5s'
    main.addEventListener('touchstart', (e) => {
        // console.log(e.touches[0].screenY)
        touchStart = e.touches[0].screenY

    })
    main.addEventListener('touchend', (e) => {
        // console.log(e.changedTouches[0].screenY)
        touchEnd = e.changedTouches[0].screenY
        console.log(touchStart - touchEnd) // 스크롤 내리면 음수. 올리면 양수.
        let swipe = touchStart - touchEnd 
        if(swipe <= -20 && rounded > 0){ // 스크롤 내리면
            rounded-- // 이전 슬라이드 보여주기
        }else if(swipe >= 20 && rounded < projectsTotal - 1){ // 스크롤 올리면
            rounded++ // 다음 슬라이드 보여주기
        }
        contentSlider.style.transform = `translate3d(${-rounded * 100}vw, 0, 0)` // 터치했다가 놓으면 움직임
        snap() // 없어도 동작함
    })
}


function animate(){
    for (let i = 0; i < projectsTotal; i++) {
        const {left} = projects[i].getBoundingClientRect()
        projects[i].querySelector('img').style.transform = `scale(${1 + Math.abs(left) * 0.005})`
        if(i === 1){
            // console.log(left) // left 값은 처음에 커졌다가 슬라이드되면서 점점 작아져서 0에 가까워지므로 슬라이드 이동을 시작한 시점에는 굉장히 확대되었다가 슬라이드 이동이 끝나면 원래 크기인 1이 된다. 
        }
        
    }
    requestAnimationFrame(animate)
}

animate()

