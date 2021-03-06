import React, { Component } from "react"
import List from "./list"
import { serverFetch } from "../dataProvider/dataFetch"
import { diffData } from "../dataProvider/dataDiff"
import { BOX_MAP } from "../constants/constNames"
import BoxHeader from "./boxHeader"

class Box extends Component {
  state = {}

  getData = () => {
    const { type, diff } = this.props
    serverFetch({ API_PATH: BOX_MAP[type] }).then(incoming => {
      const localData = JSON.parse(localStorage[`localData_${type}`] || "{}")
      localStorage.setItem(`localData_${type}`, JSON.stringify(incoming))
      this.setState({
        data: diff ? diffData({ ...localData }, { ...incoming }) : incoming
      })
    })
  }

  componentDidMount() {
    this.getData()
    this.timer = setInterval(this.getData, 30000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    const { data } = this.state
    const { title, type } = this.props
    return (
      <div className="box table">
        <BoxHeader data={data} title={title} onClick={this.getData} />
        <List data={data} type={type} />
      </div>
    )
  }
}

export default Box
