module Go {

    export class MemoryService {

        private static _instance: MemoryService;

        static get Instance(): MemoryService {
            if (!MemoryService._instance) {
                MemoryService._instance = new MemoryService();
            }
            return MemoryService._instance;
        }

        history: number[][][];

        add(newArray: number[][]) {

            this.history.push(newArray);

        }

        clearHistory() {

            this.history = [];

        }

        constructor() {
            this.history = [];
        }

    }

} 