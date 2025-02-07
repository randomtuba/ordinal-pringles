const TABS = ["markup", "ach", "settings"]
let diff
function loadTabs(){
    for (let i = 0; i < TABS.length; i++) {
        DOM(`${TABS[i]}Page`).style.display = 'none'
    }
    switchTab('ord')
}
function tick(diff){
    if(!data.ord.isPsi && data.ord.ordinal >= PSI_VALUE && data.ord.base === 3) {
        data.ord.isPsi = true
        data.ord.ordinal = 4
    }

    let timesToLoop = [0,0]
    if(diff < 1) diff = 1

    for (let i = 0; i < timesToLoop.length; i++) timesToLoop[i] = diff*data.autoLevels[i]*factorBoost()*data.dy.level
    if (timesToLoop[0]>=1) successor(timesToLoop[0])
    if (timesToLoop[1]>=1) maximize(timesToLoop[1])
}
function mainLoop() {
    if(isNaN(data.offline.time)) data.offline.time = 0
    diff = data.offline.toggled ? (Date.now() - data.time) / 1000 : getRandom(0.048, 0.053)
    data.offline.time = Math.max(data.offline.time - OFFLINE.boost() * diff, 0)
    data.time += diff * OFFLINE.boost
    data.time = Date.now()

    tick(diff)
    if(data.dy.gain > 0) data.dy.level += diff*data.dy.gain

    checkAchs()
    uHTML.update()
}
document.addEventListener('keydown', (event) => {
    let key = event.key;
    if (key === "s") successor()
    if (key === "m") maximize()
}, false);

window.setInterval(function () {
    mainLoop()
}, 50);
window.onload = function () {
    try { load() } catch(e){ console.log('New Save!\nIf you\'re seeing this, welcome :)') }
    loadTabs()
    initAchs()
}