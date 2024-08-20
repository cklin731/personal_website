function toggleMenu() {
    // 按第一次時，將menu打開，並將menu裡的元素一個一個顯示出來，第二次時，將menu關閉
    const menu = document.querySelector('#mobile-menu');
    const elements = Array.from(menu.children);
    if (elements[0].children[0].classList.contains('collapse')) {
        let delay = 0; // Declare and initialize the delay variable
        for (const element of elements) {
            setTimeout(() => {
                    element.children[0].classList.remove('collapse');
                }, delay);
                delay += 100;
        }
    } else {
        let delay = 0; // Declare and initialize the delay variable
        for (const element of elements) {
            setTimeout(() => {
                    element.children[0].classList.add('collapse');
                }, delay);
                delay += 100;
        }
    }
}

function copyEmailToClipboard() {
    navigator.clipboard.writeText('erictsaiyulin@gmail.com');
    alert('Email copied to clipboard!');
}
function getContentbyJson(path) {
    // read the content from the json file and return the content as parseTopNWorks does
    return fetch(path)
        .then(response => response.json())
        .then(content => {
            return content;
        })
        .catch(error => {
            console.error('Error fetching content:', error);
        });
}

async function createRecentWorkCard(WorkMetadata, device_width, ImageOnRight = true) {
    const title = document.createElement('h2');
    title.classList.add('text-2xl', 'font-black');
    const info = document.createElement('h3');
    info.classList.add('pt-4');
    const description = document.createElement('p');
    description.classList.add('pt-6', 'text-sm');
    const tags = document.createElement('h6');
    tags.classList.add('pt-6', 'italic', 'text-xs');

    title.innerHTML = WorkMetadata.title;
    info.innerHTML = WorkMetadata.info;
    description.innerHTML = WorkMetadata.description;
    tags.innerHTML = WorkMetadata.tags.map(tag => '#' + tag).join(' ');

    const image = document.createElement('img');
    image.classList.add('rounded-2xl', 'float-left');

    // image.src = 'cover.jpg' if the image is in the same directory as the metatdata.json file, else image.src = 'cover.png'
    image.src = 'works/' + WorkMetadata.dirname + '/cover.jpg';
    image.onerror = () => {
        image.src = 'works/' + WorkMetadata.dirname + '/cover.JPG';
        image.onerror = () => {
            image.src = 'works/' + WorkMetadata.dirname + '/cover.png';
            image.onerror = () => {
                image.src = ''
            }
        }
    }
    
    // for not smarthphone device
    if (device_width > 640) {
        const RecentWorkText = document.createElement('div');
        RecentWorkText.classList.add('w-1/2', 'pl-12', 'pr-12');
        RecentWorkText.appendChild(title);
        RecentWorkText.appendChild(info);
        RecentWorkText.appendChild(description);
        RecentWorkText.appendChild(tags);
        
        const RecentWorkImage = document.createElement('div');
        RecentWorkImage.classList.add('w-1/2', 'p-4', 'flex', 'justify-center');
        RecentWorkImage.appendChild(image);
        
        const RecentWork = document.createElement('div');
        RecentWork.classList.add('flex', 'flex-row', 'place-content-center', 'place-items-center', 'w-full');
        if (ImageOnRight) {
            RecentWork.appendChild(RecentWorkText);
            RecentWork.appendChild(RecentWorkImage);
        } else {
            RecentWork.appendChild(RecentWorkImage);
            RecentWork.appendChild(RecentWorkText);
        }
        // RecentWork.appendChild(RecentWorkText);
        // RecentWork.appendChild(RecentWorkImage);
        const section = document.createElement('section');
        section.classList.add('py-8', 'px-8', 'mb-8', 'rounded-2xl');
        section.appendChild(RecentWork);

        main = document.querySelector('main');
        main.appendChild(section);
    }
    else{
        const RecentWorkText = document.createElement('div');
        RecentWorkText.classList.add('pl-2', 'pr-2', 'mt-4');
        RecentWorkText.appendChild(title);
        RecentWorkText.appendChild(info);
        RecentWorkText.appendChild(description);
        RecentWorkText.appendChild(tags);
        
        const RecentWorkImage = document.createElement('div');
        RecentWorkImage.classList.add('p-2', 'flex', 'justify-center');
        RecentWorkImage.appendChild(image);
        
        const RecentWork = document.createElement('div');
        RecentWork.classList.add('flex', 'flex-col', 'place-content-center', 'place-items-center', 'w-full');
        RecentWork.appendChild(RecentWorkImage);
        RecentWork.appendChild(RecentWorkText);

        const section = document.createElement('section');
        section.classList.add('py-4', 'px-4', 'mb-4', 'rounded-2xl');
        section.appendChild(RecentWork);

        main = document.querySelector('main');
        main.appendChild(section);
    }

}

async function createRecentWorks(WordsMetadata) {
    const metadataArray = Array.from(WordsMetadata); // Convert WordsMetadata to an array if it is not already an array
    let imageOnRight = false; // Set initial value of ImageOnRight parameter
    for (const WorkMetadata of metadataArray) {
        await createRecentWorkCard(WorkMetadata, imageOnRight); // Pass the current value of imageOnRight to the function
        imageOnRight = !imageOnRight; // Toggle the value of imageOnRight for the next iteration
    }
}
