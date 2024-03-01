
// export const getTopCreators = (creators) => {
//         const finalCreators = [];
    
//         const finalResults = creators?.reduce((index , currentValue) =>{
//             (index[currentValue.creator.wallet] = index[currentValue.creator.wallet] || []).push(currentValue);
//             return index
//         },{})
    
//     Object.entries(finalResults).forEach((item)=>{
//         console.log(finalResults);
//         const seller = item[0];
//         const total = item[1].map((newItem)=> Number(newItem.price))
//         .reduce((previousValue , currentValue)=> previousValue + currentValue , 0);
//         const image = item[1].map((newItem)=> newItem);
//         finalCreators.push({seller , total ,image })
//     })
//     return finalCreators;

// }
export const getTopCreators = (creators) => {
    // Check if creators is an array
    if (!Array.isArray(creators)) {
        console.error("Error: creators is not an array.");
        return [];
    }

    const finalCreators = [];
    const finalResults = creators.reduce((index, currentValue) => {
        (index[currentValue.creator.wallet] = index[currentValue.creator.wallet] || []).push(currentValue);
        return index;
    }, {});

    Object.entries(finalResults).forEach((item) => {
        const seller = item[0];
        const total = item[1].map((newItem) => Number(newItem.price))
            .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
        const image = item[1].map((newItem) => newItem);
        finalCreators.push({ seller, total, image });
    });

    return finalCreators;
}
