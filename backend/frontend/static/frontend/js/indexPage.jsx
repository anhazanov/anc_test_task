class IndexPage extends React.Component {
    constructor (props) {
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        super(props);
        this.state = {
            number: [],
            search: ''
        }
    }

    // Get staff
    loadChairman = (pos) => {
        axios.get(`/api/staff/?position=${pos}`)
        .then(res => {
            let data = res.data;
            this.setState({ number: data});
          })
        .catch( err => {
            console.log(err)
        });
    }


    // Search
    changeSearch = (event) => {
        this.setState({ search: event.target.value });
    }
    runSearch = () => {
        axios.get(`/api/staff/?search=${this.state.search}`)
        .then(res => {
            let data = res.data;
            this.setState({ number: data});
          })
        .catch( err => {
            console.log(err)
        });
    }

    // Sort
    sortName = () => {
        const strAscending = [...this.state.number].sort((a, b) =>
            a.fullname > b.fullname ? 1 : -1,
        );
        this.setState({ number: strAscending })
    }
    sortEmail = () => {
        const strAscending = [...this.state.number].sort((a, b) =>
            a.email > b.email ? 1 : -1,
        );
        this.setState({ number: strAscending })
    }
    sortManager = () => {
        const strAscending = [...this.state.number].sort((a, b) =>
            a.manager > b.manager ? 1 : -1,
        );
        this.setState({ number: strAscending })
    }
    sortPosition = () => {
        const strAscending = [...this.state.number].sort((a, b) =>
            a.position > b.position ? 1 : -1,
        );
        this.setState({ number: strAscending })
    }
    sortDate = () => {
        const strAscending = [...this.state.number].sort((a, b) =>
            a.date_admission > b.date_admission ? 1 : -1,
        );
        this.setState({ number: strAscending })
    }

    render () {
        return (
                <div class="hero-unit">
                    <h1>Staff list</h1>
                    <div>
                        <div class="well form-search">
                            <input type="text" class="input-medium search-query span4" placeholder="Search in staff" onChange={this.changeSearch}/>
                            <button class="btn" onClick={this.runSearch}>Search</button>
                        </div>
                    </div>
                    <hr />
                    <div class='container'>
                        <button class="btn" onClick={() => this.loadChairman('')}>Load all staff</button>&nbsp;
                        <button class="btn" onClick={() => this.loadChairman(1)}>Load chairman(lv 1)</button>&nbsp;
                        <button class="btn" onClick={() => this.loadChairman(2)}>Load directors(lv 2)</button>&nbsp;
                        <button class="btn" onClick={() => this.loadChairman(3)}>Load unit managers(lv 3)</button>&nbsp;
                        <button class="btn" onClick={() => this.loadChairman(4)}>Load deputy unit managers(lv 4)</button>&nbsp;
                    </div><div class='container'>
                        <button class="btn" onClick={() => this.loadChairman(5)}>Load engineer(lv 5)</button>&nbsp;
                        <button class="btn" onClick={() => this.loadChairman(6)}>Load worker(lv 6)</button>&nbsp;
                        <button class="btn" onClick={() => this.loadChairman(7)}>Load intern(lv 7)</button>&nbsp;
                    </div>
                    <hr />
                    <div class="row">
                            <div class="span2"><a style={{cursor:'pointer'}} onClick={this.sortName}>Full name</a></div>
                            <div class="span1"><a style={{cursor:'pointer'}} onClick={this.sortPosition}>Position</a></div>
                            <div class="span2"><a style={{cursor:'pointer'}} onClick={this.sortDate}>Date admisiion</a></div>
                            <div class="span2"><a style={{cursor:'pointer'}} onClick={this.sortEmail}>Email</a></div>
                            <div class="span3"><a style={{cursor:'pointer'}} onClick={this.sortManager}>Manager</a></div>
                            
                    </div>
                    <hr />
                    {this.state.number.map((output, id) => (
                    <div>
                        <div class="row" key={id}>
                            <div class="span2">{output.fullname}</div>
                            <div class="span1">{output.position}</div>
                            <div class="span2">{output.date_admission}</div>
                            <div class="span2">{output.email}</div>
                            <div class="span3">{output.manager}</div>
                            
                        </div>
                    </div>
                    ))}

                </div>
        )
    }
}

ReactDOM.render(<IndexPage/>, document.getElementById("index"))