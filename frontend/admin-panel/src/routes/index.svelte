<button class="modes-toggle"><img src="static/sun.png" alt="mode-toggle"/></button>
<div class="login">
    <h2>Admin Panel</h2>
    <button class="sign-in">Sign In</button>
</div>
<style>
    .login {
        margin: auto;
        text-align: center;
        border-radius: 10px;
        background: white;
        padding: 20px;
        width: 300px;
        height: 100px;
        z-index: 40;
        color: black;
        align-items: center;
    }
    .sign-in{
        display: block;
        width: 100%;
        background-color: red;
    }
    .modes-toggle{
        float: right;
        padding: 0;
        border: none;
        background: none;
    }
    :global(body) {
		background-color: #808080;
		color: #0084f6;
		transition: background-color 0.3s
	}
    :global(body.dark-mode) {
		background-color: #1d3040;
		color: #bfc2c7;
	}
</style>