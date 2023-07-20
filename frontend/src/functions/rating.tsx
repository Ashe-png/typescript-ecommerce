import { Rating } from 'react-simple-star-rating';

export const showAverage = (p: any) => {
  if (p && p.ratings) {
    let ratingsArray = p && p.ratings;
    let total: any = [];
    let length = ratingsArray.length;
    // console.log('length', length);
    ratingsArray.map((r: any) => total.push(r.star));
    let totalReduced = total.reduce((p: any, n: any) => p + n, 0);
    // console.log('totalReduced', totalReduced);
    let highest = length * 5;
    // console.log('highest', highest);
    let result = (totalReduced * 5) / highest;
    // console.log ('result', result);
    return (
      <>
        <div className="pe-1">
          <Rating
            initialValue={result}
            readonly
            SVGclassName="w-[23px]"
            fillColor="red"
          />
          <span className=" max-sss:hidden font-medium">
            ({p.ratings.length})
          </span>
        </div>
      </>
    );
  }
};
