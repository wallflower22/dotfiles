# Set this on load
set -g -x PATH /usr/local/bin $PATH

# Path to your oh-my-fish.
set fish_path $HOME/.oh-my-fish

# Theme
set fish_theme fishy-drupal

# Which plugins would you like to load? (plugins can be found in ~/.oh-my-fish/plugins/*)
# Custom plugins may be added to ~/.oh-my-fish/custom/plugins/
# Example format: set fish_plugins autojump bundler

# Path to your custom folder (default path is $FISH/custom)
set fish_custom $HOME/dotfiles/oh-my-fish

# Load oh-my-fish configuration.
. $fish_path/oh-my-fish.fish

# Use z.sh
. ~/z-fish/z.fish

# in ~/.config/fish/config.fish
# # Load the default rubies
if test -z $rvm_bin_path
    exec bash --login -c "exec fish"
end

# Remove Greeting
set -g -x fish_greeting 'Hello Theodoros!'
