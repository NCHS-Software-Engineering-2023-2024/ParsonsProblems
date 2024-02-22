

export const DndContainer = () => {
    const [state, setState] = useState( {
            {
                id: 1,
                name: 'first',
            },
            {
                id: 2,
                name: 'second',
            },
            {
                id: 3,
                name: 'third',
            }
    });
    const draggingItem = null;
    const newItemName = "";

    handleDragStart = (e, item) => {
        this.setState({ draggingItem: item });
        e.dataTransfer.setData('text/plain', '');
    };

    handleDragEnd = () => {
        this.setState({ draggingItem: null });
    };

    handleDragOver = (e) => {
        e.preventDefault();
    };

    handleDrop = (e, targetItem) => {
        const { draggingItem, items } = this.state;
        if (!draggingItem) return;

        const currentIndex = items.indexOf(draggingItem);
        const targetIndex = items.indexOf(targetItem);

        if (currentIndex !== -1 && targetIndex !== -1) {
            items.splice(currentIndex, 1);
            items.splice(targetIndex, 0, draggingItem);
            this.setState({ items });
        }
    };

    handleNameChange = (e) => {
        this.setState({ newItemName: e.target.value });
    };

    render() {
        return (

            <div className="sortable-list">
                {this.state.items.map((item, index) => (
                    <div
                        key={item.id}
                        className=
                        {`item ${item === this.state.draggingItem ?
                            'dragging' : ''
                            }`}
                        draggable="true"
                        onDragStart={(e) =>
                            this.handleDragStart(e, item)}
                        onDragEnd={this.handleDragEnd}
                        onDragOver={this.handleDragOver}
                        onDrop={(e) => this.handleDrop(e, item)}
                    >
                        <div className="details">
                            <span>{item.name}</span>
                        </div>

                    </div>
                ))}
            </div>
        );
    }
}
export default DndContainer;