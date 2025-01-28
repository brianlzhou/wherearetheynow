export default function Footer() {
    return (
        <>
            <p className="mb-4">Project by <a className="underline" href="https://brianzhou.org">Brian Zhou</a> built off of a platform for showing Emerging Ventures winners by <a className="underline" href="https://nabeelqu.co">Nabeel S. Qureshi</a> and a similar implementation for Thiel Fellows by <a className="underline" href="https://x.com/whp_wessel">Wes</a>; design inspired by <a className="underline" href="https://thesephist.com">Linus Lee&lsquo;s</a> project, <a className="underline" href="https://ycvibecheck.com/">YC Vibe Check</a>.</p>
            <p className="mb-4">Written in <a className="underline" href="https://nextjs.org/">next.js</a>, with semantic search thanks to <a className="underline" href="https://huggingface.co/docs/transformers.js/index">transformers.js</a> and <a className="underline" href="https://www.sbert.net/">sentence-transformers</a>. The model is <a href="https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2" className="underline">all-MiniLM-L6-v2</a>.</p>
        </>
    )
}