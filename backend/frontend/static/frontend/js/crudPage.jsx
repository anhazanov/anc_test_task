const CrudPage = () => {
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    const formRef = React.useRef()
    const [form, setForm] = React.useState({
      fullname: '',
      date: '', 
      email: '',
      position: '',
      manager: ''
    })

    const [positions, setPositions] = React.useState([{
        id: '',
        manager: '',
        position: ''
    }])

    // React.useEffect(
    //     axios.get("/api/positions/")
    //     .then(res => {
    //         let data = res.data;
    //         console.log(data);
    //         // setPositions([...positions, data]);
    //         console.log(positions);
    //       })
    //     .catch( err => {
    //         console.log(err)
    //     })
    // );

    const handleChange = (e) => {
        const { target } = e;
        const { name, value } = target;
    
        setForm({
          ...form,
          [name]: value,
        });
        console.log(form)
      };
    
    const handleSubmit = (e) => {
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.post("/api/staff/", form)
        .then(res => {
            let data = res.data;
            console.log(data);
          })
        .catch( err => {
            console.log(err)
        });
    };


    const formRefDel = React.useRef()
    const [formDel, setFormDel] = React.useState({
      fullname: '',
      date: '', 
      email: '',
      position: '',
      manager: ''
    })

    const handleChangeDel = (e) => {
        const { target } = e;
        const { name, value } = target;
    
        setFormDel({
          ...form,
          [name]: value,
        });
        console.log(form)
      };
    
    const handleSubmitDel = (e) => {
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.delete("/api/staff/", formDel)
        .then(res => {
            let data = res.data;
            console.log(data);
          })
        .catch( err => {
            console.log(err)
        });
    };
        
    
    return (
            <div class="hero-unit">
                <h3>Add stuff</h3>
                <dev ref={formRef}>
                <label>
                    <span>Full name</span>
                    <input type='text' name='fullname' value={form.fullname} onChange={handleChange} placeholder="What's your name?"/>
                </label>
                <label>
                    <span>Date</span>
                    <input type='date' name='date' value={form.date} onChange={handleChange}/>
                </label>
                <label>
                    <span>Email</span>
                    <input type='email' name='email' value={form.email} onChange={handleChange} placeholder="What's your email?"/>
                </label>
                <label>
                    <span>Position</span>
                    <input type='text' name='position' value={form.position} onChange={handleChange} placeholder="What's your position?"/>
                </label>
                <label>
                    <span>Manager</span>
                    <input type='text' name='manager' value={form.manager} onChange={handleChange} placeholder="Who is your manager?"/>
                </label>
                <button type="submit" value="Add staff" onClick={handleSubmit}>Add staff</button>
                </dev>
                <hr />

                <h3>Delete stuff</h3>
                <dev ref={formRefDel}>
                <label>
                    <span>Full name</span>
                    <input type='text' name='fullname' value={formDel.fullname} onChange={handleChangeDel} placeholder="What's your name?"/>
                </label>
                <label>
                    <span>Date</span>
                    <input type='date' name='date' value={formDel.date} onChange={handleChangeDel}/>
                </label>
                <label>
                    <span>Email</span>
                    <input type='email' name='email' value={formDel.email} onChange={handleChangeDel} placeholder="What's your email?"/>
                </label>
                <label>
                    <span>Position</span>
                    <input type='text' name='position' value={formDel.position} onChange={handleChangeDel} placeholder="What's your position?"/>
                </label>
                <label>
                    <span>Manager</span>
                    <input type='text' name='manager' value={formDel.manager} onChange={handleChangeDel} placeholder="Who is your manager?"/>
                </label>
                <button type="submit" value="Add staff" onClick={handleSubmitDel}>Delete staff</button>
                </dev>
                <hr />
            </div>
    )
    }


ReactDOM.render(<CrudPage/>, document.getElementById("crud"))