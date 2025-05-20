//Generating WHY US Points
const PointContainer = document.querySelector('.points-container')
function generatePoints(heading, description, iconClass) {
    return (
        PointContainer.innerHTML = PointContainer.innerHTML + `
        <div class="point flex gap-4 lg:w-[300px] m-2">
                        <div class="logo-container justify-center items-start ">
                            <div class="point-logo bg-primary-textTheme-two w-[50px] aspect-square rounded-full flex justify-center items-center text-primary-theme-one">
                                <i class=" ${iconClass} text-[clamp(1.25rem,1.75vw,10rem)]"></i>
                            </div>
                        </div>
                        <div class="point-text">
                            <div class="point-heading text-[clamp(1.25rem,1.75vw,10rem)] text-primary-theme-two font-Lobster">
                                ${heading}
                            </div>
                            <div class="point-description">
                                ${description}
                            </div>
                        </div>
                    </div>`
    )
}
//Declaring Class Point
class Point {
    constructor(heading, description, iconClass) {
        this.heading = heading
        this.description = description
        this.iconClass = iconClass
    }
}
//Database of Different Points
const Points = [
    new Point("Question Bank", "Summarizer doesn't just provide summaries; it challenges you to think critically. Get five thought-provoking questions based on the text. ", "fa-regular fa-thumbs-up"),
    new Point("Quality Answers", "Summarizer is your personal assistant for understanding complex documents. Have questions about the content? Simply ask!", "fa-solid fa-award"),
    new Point("Complex PDF", "Summarizer is designed to tackle even the most complex documents. We can extract the core meaning and key insights from intricate content.", "fa-solid fa-id-card"),
]
Points.forEach(point => {
    generatePoints(point.heading, point.description, point.iconClass)
})