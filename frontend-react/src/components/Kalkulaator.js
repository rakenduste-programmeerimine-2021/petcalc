function Kalkulaator () {
    return(
        <> {/* pooleli */}
            <div style={{ textAlign: "center" }}>
                <form onSubmit={handleSubmit}>
                    <label>Mis on looma liik?</label>
                    <Input placeholder="Liik" ref={inputRef1} type="text" value={species} onChange={(e) => setSpecies( e.target.value)} autoFocus/>
                    <label>Mis on looma vanus?</label>
                    <Input placeholder="Vanus" ref={inputRef2} type="text" value={age} onChange={(e) => setAge(e.target.value)} autoFocus />
                    <Button htmlType="submit" type="primary">Arvuta</Button>
                </form> 
            </div>
        </>
    )
}

export default Kalkulaator;