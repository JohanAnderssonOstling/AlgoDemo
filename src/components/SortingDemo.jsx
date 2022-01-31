import React from "react";
import '../css/SortingDemo.css'
import '../css/Style.css'
const MIN = 50
const MAX = 500
const ANIMATION_SPEED  = 75;
const ARRAY_SIZE = 35
const BAR_WIDTH = 35;

const UNSORTED_COLOR = "lightblue"
const SORTED_COLOR = "green" 
const SWAP_COLOR = "red"

export default class SortingDemo extends React.Component{
    constructor(props){
        super(props);
        this.state = {array:[],array:[],};
    }

    componentDidMount(){
        this.generateArray();
    }
    generateArray(){
        const array = [];
        for (let i = 0; i < ARRAY_SIZE; i++){
            let random = Math.floor(Math.random() * (MAX - MIN + 1) + MIN);
            array.push(random)
        }
        const swapIndexes = [-1, -1];
        this.setState({swapIndexes});
        this.setState({array});
        this.setState({sorted: false});
    }
    animateMergeSort(inputArray){
        const {sorted} = this.state;
        if (sorted) return;
        const sortStates = this.mergeSort(inputArray);
        const animateSorting = (i) => {
            setTimeout(() =>{
                const array = sortStates[i];
                this.setState({array});
                if (++i < sortStates.length)
                    animateSorting(i);
            }, ANIMATION_SPEED)
        }
        animateSorting(0);
    }
    mergeSort(array){
        const sortStates = [];
        function merge(left, mid, right){
            let i = left, j = mid + 1;
            const auxArray = []
            
            while((i <= mid) && (j <= right)){
                if (array[i] <= array[j]) auxArray.push(array[i++]);
                else auxArray.push(array[j++]);
            }
            while(i <= mid) auxArray.push(array[i++]);
            while(j <= right) auxArray.push(array[j++]);
            for (i=left; i <= right; i++){
                 array[i] = auxArray[i - left];
                 sortStates.push(array.slice());
            }
        }
        function mergeSortAux(left, right){
            if (left >= right) return;
            const mid = Math.floor((left + right) / 2);
            mergeSortAux(left, mid);
            mergeSortAux(mid + 1, right);
            merge(left, mid, right);
        }
        mergeSortAux(0, array.length -1);
        this.setState({sorted: true});
        return sortStates;
    }
    
    animateInsertionSort(inputArray){
        const {sorted} = this.state;
        if (sorted) return;
        const array = inputArray.slice();
        const sortStates = this.insertionSort(inputArray);
        const animateSorting = (i) => {
            setTimeout(() => {
                const [j, k] = sortStates[i];
                this.swap(array,j, k);
                this.setState({array});
                let swapIndexes = [j];
                this.setState({swapIndexes});
                if (++i < sortStates.length)
                    animateSorting(i);
                else{
                    let swapIndexes = [-1];
                    this.setState({swapIndexes})
                }
            }, Math.floor(ANIMATION_SPEED))
        }
        animateSorting(0);
    }
    swap(array, i, j){
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    insertionSort(array){
        const sortStates = []
        for (let i = 1; i < array .length; i++){
            let j = i - 1
            while(j >= 0 && array [j] > array [j + 1]){
                this.swap(array , j, j + 1)
                sortStates.push([j, j + 1])   
                j -= 1
            }
        }
        this.setState({sorted: true});
        return sortStates;
    }
    render() {
        let {array} = this.state;
        const {swapIndexes} = this.state;
        
        return (
            <div className = "header">
            <button className = "button" onClick={() => 
                this.generateArray()}>Generate values</button>
            <button className = "button" onClick={() => 
                this.animateInsertionSort(array)}>Insertion sort</button>
            <button className = "button" onClick={() => 
                this.animateMergeSort(array)}>Merge sort</button>
            
          <div className="array-container">
            
            {array.map((value, id) => (
              <div
                className="array-bar"
                key={id}
                style={{
                  backgroundColor: (id == swapIndexes[0]) ? SWAP_COLOR : UNSORTED_COLOR,
                  width: `${BAR_WIDTH}px`,
                  height: `${MAX}px`,
                  transform: `scaleY(${value / MAX})`,
                }}></div>
            ))}
          </div>
          </div>
        );
      }
    }
