const db = require('../model/connection');

const getData = async (req, res) => {
    const getBlog = await db
        .from('blog')
        .select(`id, title, description, categori(id, name)`);
    console.log(getBlog)
    res.json({
        getBlog
    });
};


const getBlogDetail = async (req, res) => {
    const { id } = req.params; // Mendapatkan ID dari URL
    const getBlog = await db.from('blog').select().eq('id', id).single(); // Ambil satu blog berdasarkan ID
    if (!getBlog) {
        return res.status(404).json({ error: 'Blog not found' }); // Menangani kasus jika blog tidak ditemukan
    }
    res.json({
        getBlog, // Mengembalikan data blog
        
    });
    
    
}



const createBlog = async (req, res) => {

    const { title, description, category_id } = req.body;
    if (!title || !description) {
        return res.status(400).json({
            error: 'Missing title or description'
        })
        
    }

    const getBlog = await db.from('blog').insert({
        title,
        description,
        category_id
    })
    

    res.json({
        getBlog,
        message: 'Blog created successfully',
    })

}



const updateBlog = async (req, res) => {
    const { title, description } = req.body
    const { id } = req.params

    const updatePost = await db.from('blog').update({
        title,
        description
    }).eq('id', id)
    
    res.json({
        data : updatePost
    })


}


const getEditForm = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await db.from('blog').select('*').eq('id', id).single();

        if (!post) {
            return res.status(404).json({
                message: 'Blog not found',
            });
        }

        res.json({
            message: 'Blog retrieved successfully',
            data: post,
        });
    } catch (error) {
        console.error('Error fetching blog:', error);
        res.status(500).json({
            message: 'Error fetching blog',
            error: error.message,
        });
    }
}



const deleteBlog = async (req, res) => {
    const { id } = req.params
    const deletePost = await db.from('blog').delete().eq('id', id)
    res.json({
        data : deletePost
    })
}



module.exports = {
    getBlogDetail,
    createBlog,
    updateBlog,
    getEditForm,
    deleteBlog,
    getData
}